import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { contactStore } from './contacts-store';

export const useContactStore = (id = '16') => {
  const store = useLocalObservable(() => contactStore);

  useEffect(() => {
    if (!store.isLoading && !store.contact) {
      store.fetchContact(id);
    }
  }, [id, store]);

  return store;
};
