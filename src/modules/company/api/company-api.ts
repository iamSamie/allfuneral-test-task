import { api } from '@/modules/shared/api';

import { Company } from '../types.ts';
import { endpoints } from './endpoints.ts';

export const CompanyApi = {
  getCompany: async (id: string) => {
    const response = await api.get<Company>(endpoints.getCompany(id));

    return response.data;
  },

  updateCompany: async (id: string, data: Partial<Company>) => {
    const response = await api.patch<Company>(endpoints.getCompany(id), data);

    return response.data;
  },

  deleteCompany: async (id: string) => {
    return await api.delete<Company>(endpoints.deleteCompany(id));
  }
};
