import { isDemoMode } from '../lib/mode';
import type { QuoteService as Backend } from './supabase/QuoteService';

/** Select storage at the boundary; both modes use the same screens and domain logic. */
export class QuoteService {
  static async getByOpportunity(...args: Parameters<typeof Backend.getByOpportunity>): ReturnType<typeof Backend.getByOpportunity> {
    const service = isDemoMode() ? (await import('../demo/services')).QuoteService : (await import('./supabase/QuoteService')).QuoteService;
    return service.getByOpportunity(...args);
  }
  static async getById(...args: Parameters<typeof Backend.getById>): ReturnType<typeof Backend.getById> {
    const service = isDemoMode() ? (await import('../demo/services')).QuoteService : (await import('./supabase/QuoteService')).QuoteService;
    return service.getById(...args);
  }
  static async create(...args: Parameters<typeof Backend.create>): ReturnType<typeof Backend.create> {
    const service = isDemoMode() ? (await import('../demo/services')).QuoteService : (await import('./supabase/QuoteService')).QuoteService;
    return service.create(...args);
  }
  static async update(...args: Parameters<typeof Backend.update>): ReturnType<typeof Backend.update> {
    const service = isDemoMode() ? (await import('../demo/services')).QuoteService : (await import('./supabase/QuoteService')).QuoteService;
    return service.update(...args);
  }
  static async delete(...args: Parameters<typeof Backend.delete>): ReturnType<typeof Backend.delete> {
    const service = isDemoMode() ? (await import('../demo/services')).QuoteService : (await import('./supabase/QuoteService')).QuoteService;
    return service.delete(...args);
  }
}
