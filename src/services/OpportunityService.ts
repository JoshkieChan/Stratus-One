import { isDemoMode } from '../lib/mode';
import type { OpportunityService as Backend } from './supabase/OpportunityService';

/** Select storage at the boundary; both modes use the same screens and domain logic. */
export class OpportunityService {
  static async getPage(...args: Parameters<typeof Backend.getPage>): ReturnType<typeof Backend.getPage> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.getPage(...args);
  }
  static async getAll(...args: Parameters<typeof Backend.getAll>): ReturnType<typeof Backend.getAll> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.getAll(...args);
  }
  static async getById(...args: Parameters<typeof Backend.getById>): ReturnType<typeof Backend.getById> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.getById(...args);
  }
  static async create(...args: Parameters<typeof Backend.create>): ReturnType<typeof Backend.create> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.create(...args);
  }
  static async update(...args: Parameters<typeof Backend.update>): ReturnType<typeof Backend.update> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.update(...args);
  }
  static async delete(...args: Parameters<typeof Backend.delete>): ReturnType<typeof Backend.delete> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.delete(...args);
  }
  static async calculateWinnability(...args: Parameters<typeof Backend.calculateWinnability>): ReturnType<typeof Backend.calculateWinnability> {
    const service = isDemoMode() ? (await import('../demo/services')).OpportunityService : (await import('./supabase/OpportunityService')).OpportunityService;
    return service.calculateWinnability(...args);
  }
}
