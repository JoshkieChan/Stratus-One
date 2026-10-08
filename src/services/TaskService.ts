import { collectPages } from './pagination';
import { toRow, fromRow } from './mapping';
import { requireTitle } from '../domain/validation';
import { supabase } from '../lib/supabaseClient';
import type { Task, TaskPack, TaskCreateInput, TaskUpdateInput } from '../types/task';

export class TaskService {
  static async getAll(userId: string): Promise<Task[]> {
    const data = await collectPages((from, to) => supabase.from('tasks').select('*').eq('user_id', userId).order('created_at', { ascending: false }).order('id').range(from, to));
    return data.map(row => fromRow<Task>(row));
  }
  static async getByOpportunity(opportunityId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(row => fromRow<Task>(row));
  }

  static async getById(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? fromRow<Task>(data) : null;
  }

  static async create(input: TaskCreateInput): Promise<Task> {
    requireTitle(input.title);
    const { data, error } = await supabase
      .from('tasks')
      .insert([toRow(input)])
      .select()
      .single();

    if (error) throw error;
    return fromRow<Task>(data);
  }

  static async update(id: string, input: TaskUpdateInput): Promise<Task> {
    if (input.title !== undefined) requireTitle(input.title);
    const patch = { ...input };
    if (input.status !== undefined) patch.completedAt = input.status === 'completed' ? new Date().toISOString() : null;
    const { data, error } = await supabase
      .from('tasks')
      .update(toRow(patch))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return fromRow<Task>(data);
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Task Pack methods
  static async getTaskPacks(opportunityId: string): Promise<TaskPack[]> {
    const { data, error } = await supabase
      .from('taskpacks')
      .select(`
        *,
        tasks (*)
      `)
      .eq('opportunity_id', opportunityId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(row => ({ ...fromRow<TaskPack>(row), tasks: (row.tasks || []).map((task: unknown) => fromRow<Task>(task)) }));
  }

  static async createTaskPack(opportunityId: string, name: string, description?: string): Promise<TaskPack> {
    requireTitle(name);
    const { data, error } = await supabase
      .from('taskpacks')
      .insert([{ opportunity_id: opportunityId, name, description }])
      .select()
      .single();

    if (error) throw error;
    return fromRow<TaskPack>(data);
  }
}
