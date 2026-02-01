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
    category = {
      name: category.name,
      description: category.description,
      url: category.image,
      type: category.type,
      userId: 1
    };
    const newCategory = await api.categories.create(category);
    set(state => ({ categories: [...state.categories, newCategory] }));
  },

  deleteCategory: async (id) => {
    await api.categories.delete(id);
    set(state => ({ categories: state.categories.filter(c => c.id !== id) }));
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

  deleteTransaction: async (id) => {
    await api.transactions.delete(id);
    set(state => ({ transactions: state.transactions.filter(t => t.id !== id) }));
  }
}));

export default useStore;
