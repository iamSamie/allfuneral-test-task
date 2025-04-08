import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { contactsStore } from './contacts-store';

export const useContactStore = (id = '16') => {
  const store = useLocalObservable(() => contactsStore);

  useEffect(() => {
    if (!store.isLoading && !store.contacts) {
      store.fetchContact(id);
    }
  }, [id, store]);

  return store;
};
