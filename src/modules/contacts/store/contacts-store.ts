import { makeAutoObservable } from 'mobx';

import { ContactsApi } from '../api/contacts-api';
import { Contacts } from '../types';

class ContactStore {
  contacts: Contacts | null = null;
  isLoading = false;
  error: string | null = null;
  cache: Record<string, { data: Contacts | null; timestamp: number }> = {};
  ttl: number = 1000 * 60 * 5;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContact(id = '16') {
    const now = Date.now();

    if (this.cache[id] && (now - this.cache[id].timestamp) < this.ttl) {
      this.contacts = this.cache[id].data;
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const data = await ContactsApi.getContact(id);
      this.contacts = data;
      this.cache[id] = { data, timestamp: now };
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch contact';
    } finally {
      this.isLoading = false;
    }
  }

  clearCache(id = '16') {
    delete this.cache[id];
  }

  async invalidateContact(id = '16') {
    this.clearCache(id);
    await this.fetchContact(id);
  }

  async updateContact(id = '16', updatedData: Partial<Contacts>) {
    this.error = null;

    const backup = this.contacts ? { ...this.contacts } : null;

    if (this.contacts) {
      this.contacts = { ...this.contacts, ...updatedData };
    }

    try {
      const updatedContact = await ContactsApi.updateContact(id, updatedData);

      this.contacts = { ...this.contacts, ...updatedContact };
      this.cache[id] = { data: this.contacts, timestamp: Date.now() };
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error when updating contact';

      if (backup) {
        this.contacts = { ...backup };
      }

      throw err;
    }
  }
}

export const contactsStore = new ContactStore();
