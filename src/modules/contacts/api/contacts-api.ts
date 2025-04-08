import { api } from '@/modules/shared/api';

import { Contacts } from '../types';
import { endpoints } from './endpoints';

export const ContactsApi = {
  getContact: async (id: string) => {
    const response = await api.get<Contacts>(endpoints.getContact(id));

    return response.data;
  },

  updateContact: async (id: string, contact: Partial<Contacts>) => {
    const response = await api.patch(endpoints.updateContact(id), contact);

    return response.data;
  }
};
