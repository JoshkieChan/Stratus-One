import { isDemoMode } from '../lib/mode';
import type { TaskService as Backend } from './supabase/TaskService';

/** Select storage at the boundary; both modes use the same screens and domain logic. */
export class TaskService {
  static async getAll(...args: Parameters<typeof Backend.getAll>): ReturnType<typeof Backend.getAll> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.getAll(...args);
  }
  static async getByOpportunity(...args: Parameters<typeof Backend.getByOpportunity>): ReturnType<typeof Backend.getByOpportunity> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.getByOpportunity(...args);
  }
  static async getById(...args: Parameters<typeof Backend.getById>): ReturnType<typeof Backend.getById> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.getById(...args);
  }
  static async create(...args: Parameters<typeof Backend.create>): ReturnType<typeof Backend.create> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.create(...args);
  }
  static async update(...args: Parameters<typeof Backend.update>): ReturnType<typeof Backend.update> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.update(...args);
  }
  static async delete(...args: Parameters<typeof Backend.delete>): ReturnType<typeof Backend.delete> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.delete(...args);
  }
  static async getTaskPacks(...args: Parameters<typeof Backend.getTaskPacks>): ReturnType<typeof Backend.getTaskPacks> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.getTaskPacks(...args);
  }
  static async createTaskPack(...args: Parameters<typeof Backend.createTaskPack>): ReturnType<typeof Backend.createTaskPack> {
    const service = isDemoMode() ? (await import('../demo/services')).TaskService : (await import('./supabase/TaskService')).TaskService;
    return service.createTaskPack(...args);
  }
}
