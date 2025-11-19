import { supabase } from '../lib/supabaseClient';
import type { Task, TaskPack, TaskCreateInput, TaskUpdateInput } from '../types/task';

export class TaskService {
  static async getByOpportunity(opportunityId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getById(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(input: TaskCreateInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, input: TaskUpdateInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
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
    return data || [];
  }

  static async createTaskPack(opportunityId: string, name: string, description?: string): Promise<TaskPack> {
    const { data, error } = await supabase
      .from('taskpacks')
      .insert([{ opportunity_id: opportunityId, name, description }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
