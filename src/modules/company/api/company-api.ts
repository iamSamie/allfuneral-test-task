import { api } from '@/modules/shared/api';

import { Company, Photo } from '../types.ts';
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
  },

  deleteImage: async (companyId: string, imageName: string) => {
    return await api.delete(endpoints.deleteImage(companyId, imageName));
  },

  uploadImage: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<Photo>(endpoints.postImage(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
};
