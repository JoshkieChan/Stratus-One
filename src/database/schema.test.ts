import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { beforeAll, beforeEach, afterEach, afterAll, expect, it } from 'vitest';
const a = '11111111-1111-4111-8111-111111111111';
const b = '22222222-2222-4222-8222-222222222222';
const opp = '33333333-3333-4333-8333-333333333333';
let db: PGlite;
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$;
    grant usage on schema auth, public to authenticated, anon;
    grant execute on function auth.uid() to authenticated, anon;
    insert into auth.users values ('${a}'), ('${b}');`);
  await db.exec(readFileSync('supabase/migrations/20261008052056_initial_workflows.sql', 'utf8'));
  await db.query(`insert into opportunities(id,user_id,title,description,agency,solicitation_number,category,value,deadline) values ($1,$2,'Contract','','Agency','ABC','IT',100,now())`, [opp,a]);
}, 30000);
beforeEach(async () => {
  await db.exec('begin; set role authenticated;');
  await db.query("select set_config('request.jwt.claim.sub',$1,true)", [a]);
});
afterEach(async () => { await db.exec('rollback;'); });
afterAll(async () => { await db.close(); });
it('allows owner access and hides another user’s rows for reads and writes', async () => {
  expect((await db.query('select * from opportunities')).rows).toHaveLength(1);
  await db.query("select set_config('request.jwt.claim.sub',$1,true)", [b]);
  expect((await db.query('select * from opportunities')).rows).toHaveLength(0);
  expect((await db.query("update opportunities set title='Stolen' returning id")).rows).toHaveLength(0);
  expect((await db.query('delete from opportunities returning id')).rows).toHaveLength(0);
});
it('denies anonymous access', async () => {
  await db.exec('set role anon;');
  await expect(db.query('select * from opportunities')).rejects.toThrow(/permission denied/);
});
it('rejects ownership reassignment', async () => {
  await expect(db.query('update opportunities set user_id=$1', [b])).rejects.toThrow(/ownership/);
});
it('rejects cross-owner parent references', async () => {
  await db.query("select set_config('request.jwt.claim.sub',$1,true)", [b]);
  await expect(db.query("insert into taskpacks(opportunity_id,name) values ($1,'Pack')", [opp])).rejects.toThrow(/foreign key/);
});
it('rejects spoofed ownership on insert', async () => {
  await expect(db.query("insert into taskpacks(user_id,opportunity_id,name) values ($1,$2,'Pack')", [b,opp])).rejects.toThrow(/row-level security/);
});
it('persists task packs and sets and clears completion timestamps', async () => {
  const pack = await db.query<{id:string}>("insert into taskpacks(opportunity_id,name) values ($1,'Pack') returning id", [opp]);
  const task = await db.query<{id:string}>("insert into tasks(opportunity_id,task_pack_id,title) values ($1,$2,'Prepare bid') returning id", [opp,pack.rows[0].id]);
  const done = await db.query<{completed_at:unknown}>("update tasks set status='completed' where id=$1 returning completed_at", [task.rows[0].id]);
  expect(done.rows[0].completed_at).toBeTruthy();
  const reopened = await db.query<{completed_at:unknown}>("update tasks set status='pending' where id=$1 returning completed_at", [task.rows[0].id]);
  expect(reopened.rows[0].completed_at).toBeNull();
});
it('recalculates untrusted quote totals and tax-only updates in Postgres', async () => {
  const quote = await db.query<{id:string; total:string}>(`insert into quotes(opportunity_id,quote_number,title,line_items,tax_rate,total)
    values ($1,'Q-1','Estimate','[{"description":"Work","quantity":3,"unitPrice":10.005,"total":1}]',0.1,1) returning id,total`, [opp]);
  expect(Number(quote.rows[0].total)).toBe(33.02);
  const updated = await db.query<{total:string;version:number}>('update quotes set tax_rate=0.2 where id=$1 returning total,version', [quote.rows[0].id]);
  expect(Number(updated.rows[0].total)).toBe(36.02);
  expect(updated.rows[0].version).toBe(2);
});
it('rejects invalid quote line amounts', async () => {
  await expect(db.query(`insert into quotes(opportunity_id,quote_number,title,line_items)
    values ($1,'Q-2','Estimate','[{"description":"Work","quantity":-1,"unitPrice":10}]')`, [opp])).rejects.toThrow(/Invalid line amount/);
});
it.each(['taskpacks', 'tasks', 'quotes'])('isolates %s records across users', async table => {
  await db.query("insert into taskpacks(opportunity_id,name) values ($1,'Pack')", [opp]);
  await db.query("insert into tasks(opportunity_id,title) values ($1,'Task')", [opp]);
  await db.query(`insert into quotes(opportunity_id,quote_number,title,line_items) values ($1,'Q-private','Quote','[{"description":"Work","quantity":1,"unitPrice":10}]')`, [opp]);
  expect((await db.query(`select * from ${table}`)).rows).toHaveLength(1);
  await db.query("select set_config('request.jwt.claim.sub',$1,true)", [b]);
  expect((await db.query(`select * from ${table}`)).rows).toHaveLength(0);
  expect((await db.query(`delete from ${table} returning id`)).rows).toHaveLength(0);
});
it('rejects a task pack belonging to a different opportunity', async () => {
  const other = await db.query<{id:string}>(`insert into opportunities(title,description,agency,solicitation_number,category,value,deadline) values ('Other','','Agency','XYZ','IT',100,now()) returning id`);
  const pack = await db.query<{id:string}>("insert into taskpacks(opportunity_id,name) values ($1,'Pack') returning id", [opp]);
  await expect(db.query("insert into tasks(opportunity_id,task_pack_id,title) values ($1,$2,'Wrong pack')", [other.rows[0].id,pack.rows[0].id])).rejects.toThrow(/foreign key/);
});
it('allows only one writer using the same quote version', async () => {
  const created = await db.query<{id:string}>(`insert into quotes(opportunity_id,quote_number,title,line_items) values ($1,'Q-lock','Quote','[{"description":"Work","quantity":1,"unitPrice":10}]') returning id`, [opp]);
  const id = created.rows[0].id;
  expect((await db.query("update quotes set title='First' where id=$1 and version=1 returning id", [id])).rows).toHaveLength(1);
  expect((await db.query("update quotes set title='Stale' where id=$1 and version=1 returning id", [id])).rows).toHaveLength(0);
  expect((await db.query<{title:string}>('select title from quotes where id=$1', [id])).rows[0].title).toBe('First');
});
