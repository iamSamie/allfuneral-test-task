import { makeAutoObservable } from 'mobx';

import { CompanyApi } from '../api/company-api.ts';
import { Company } from '../types';


class CompanyStore {
  company: Company | null = null;
  backupCompany: Company | null = null;
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

  clearCache(id = '12') {
    delete this.cache[id];
  }

  async invalidateCompany(id = '12') {
    this.clearCache(id);
    await this.fetchCompany(id);
  }

  async updateCompany(id = '12', updatedData: Partial<Company>) {
    this.error = null;

    const backup = this.company ? { ...this.company } : null;
    this.backupCompany = backup;

    if (this.company?.id === id) { // locally
      this.company = { ...this.company, ...updatedData };
    }

    try {
      const updatedCompany = await CompanyApi.updateCompany(id, updatedData);

      this.company = { ...this.company, ...updatedCompany };
      this.cache[id] = { data: this.company, timestamp: Date.now() };
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error when updating a company';

      if (this.backupCompany) {
        this.company = { ...this.backupCompany };
      }

      throw err;
    }
  }

  async deleteCompany(id = '12') {
    this.error = null;
    this.isLoading = true;

    try {
      const response = await CompanyApi.deleteCompany(id);

      if (response.status === 200) {
        this.clearCache(id);
        this.backupCompany = null;
        this.company = null;
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error when deleting a company';

      if (this.backupCompany) {
        this.company = { ...this.backupCompany };
      }
    } finally {
      this.isLoading = false;
    }
  }

  async deleteImage(companyId = '12', imageName: string) {
    this.error = null;

    try {
      await CompanyApi.deleteImage(companyId, imageName);
      await this.invalidateCompany(companyId);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error when deleting image';
      throw err;
    }
  }

  async uploadImage(companyId = '12', file: File) {
    this.error = null;

    const backupImages = this.company?.photos ? [...this.company.photos] : null;

    try {
      const newImage = await CompanyApi.uploadImage(companyId, file);

      if (this.company && this.company.id === companyId) {
        this.company.photos = [...this.company.photos, newImage];
        this.cache[companyId] = {
          data: this.company,
          timestamp: Date.now(),
        };
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error when uploading image';

      if (backupImages && this.company) {
        this.company.photos = backupImages;
      }

      throw err;
    }
  }
}

export const companyStore = new CompanyStore();
