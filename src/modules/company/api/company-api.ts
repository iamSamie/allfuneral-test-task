import { api } from '@/modules/shared/api';

import { Company } from '../types.ts';
import { endpoints } from './endpoints.ts';

export const CompanyApi = {
  getCompany: async (id: string) => {
    const response = await api.get<Company>(endpoints.getCompany(id));

    return response.data;
  },
};
