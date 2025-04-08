import { makeAutoObservable } from 'mobx';

import { CompanyApi } from '../api/company-api.ts';
import { Company } from '../types';


class CompanyStore {
  company: Company | null = null;
  isLoading = false;
  error: string | null = null;
  cache: Record<string, { data: Company | null; timestamp: number }> = {};
  ttl: number = 1000 * 60 * 5;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCompany(id: string) {
    const currentTimestamp = Date.now();

    if (this.cache[id] && (currentTimestamp - this.cache[id].timestamp) < this.ttl) {
      this.company = this.cache[id].data;
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const data = await CompanyApi.getCompany(id);
      this.company = data;
      this.cache[id] = { data, timestamp: currentTimestamp };
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.isLoading = false;
    }
  }

  clearCache(id: string) {
    delete this.cache[id];
  }

  async invalidateCompany(id: string) {
    this.clearCache(id);
    await this.fetchCompany(id);
  }
}
export const companyStore = new CompanyStore();
