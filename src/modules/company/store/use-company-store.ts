import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { companyStore } from './company-store';

export const useCompanyStore = (id = '12') => {
  const store = useLocalObservable(() => companyStore);

  useEffect(() => {
    if (!store.isLoading && !store.company) {
      store.fetchCompany(id);
    }
  }, [id, store]);

  return store;
};