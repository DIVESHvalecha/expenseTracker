import { create } from 'zustand';
import api from '../services/api';

const useStore = create((set, get) => ({
  user: api.auth.getCurrentUser(),
  categories: [],
  transactions: [],
  loading: false,
  error: null,

  // Auth Actions
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await api.auth.login(email, password);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  register: async (name, username, email, phoneNo, password) => {
    set({ loading: true, error: null });
    try {
      const user = await api.auth.register(name, username, email, phoneNo, password);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const data = await api.auth.forgotPassword(email);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  validateToken: async (token) => {
    set({ loading: true, error: null });
    try {
      const data = await api.auth.validateToken(token);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.auth.resetPassword(token, password);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    await api.auth.logout();
    set({ user: null, categories: [], transactions: [] });
  },

  // Category Actions
  fetchCategories: async () => {
    set({ loading: true });
    const categories = await api.categories.getAll();
    set({ categories, loading: false });
  },

  addCategory: async (category) => {
    const categoryData = {
      name: category.name,
      description: category.description,
      url: category.url,
      type: category.type,
      userId: 1
    };
    await api.categories.create(categoryData);
    await get().fetchCategories();
  },

  updateCategory: async (id, category) => {
    const categoryData = {
      name: category.name,
      description: category.description,
      url: category.url,
      type: category.type,
      userId: 1
    };
    await api.categories.update(id, categoryData);
    await get().fetchCategories();
  },

  deleteCategory: async (id) => {
    await api.categories.delete(id);
    await get().fetchCategories();
  },

  // Transaction Actions
  fetchTransactions: async () => {
    set({ loading: true });
    const transactions = await api.transactions.getAll();
    set({ transactions, loading: false });
  },

  addTransaction: async (transaction) => {
    const newTransaction = await api.transactions.create(transaction);
    set(state => ({ transactions: [newTransaction, ...state.transactions] }));
  },

  updateTransaction: async (id, transaction) => {
    await api.transactions.update(id, transaction);
    await get().fetchTransactions();
  },

  deleteTransaction: async (id) => {
    await api.transactions.delete(id);
    set(state => ({ transactions: state.transactions.filter(t => t.transactionId !== id) }));
  },

  bulkUploadTransactions: async (file) => {
    const results = await api.transactions.bulkUpload(file);
    // After bulk upload, if some were successful, we should probably fresh the main list
    // But since this is a simulation for now, we just return the results for the UI to display
    await get().fetchTransactions();
    return results;
  }
}));

export default useStore;
