const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Mock Data
let categories = [
  {
    id: '1',
    name: 'Food',
    type: 'expense',
    description: 'Groceries, dining out, and snacks',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Rent',
    type: 'expense',
    description: 'Monthly apartment rent and utilities',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Entertainment',
    type: 'expense',
    description: 'Movies, games, and streaming services',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop'
  },
];

let transactions = [
  { id: '1', note: 'Grocery', amount: 50, categoryId: '1', type: 'expense', date: '2024-03-15' },
  { id: '2', note: 'Salary', amount: 3000, categoryId: '2', type: 'income', date: '2024-03-01' },
];

const api = {
  auth: {
    login: async (email, password) => {
      const response = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password
        }),
        credentials: 'include',
        redirect: 'manual', // IMPORTANT
      });

      if (response.status === 200 || response.status === 302) {
        // Login successful, session cookie is set
        const userData = { success: true, email };
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }

      const errorData = await response.json().catch(() => ({}));
      // console.log(errorData);
      throw new Error(errorData.error || 'Login failed');
    },
    register: async (name, username, email, phoneNo, password) => {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, phoneNo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // This throws the error message from your backend (e.g., "Email already exists")
        throw new Error(data.body || 'Registration failed');
      }

      // Important: Save the user to localStorage so the app knows you are logged in
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    },
    forgotPassword: async (email) => {
      const response = await fetch('http://localhost:8080/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to send reset email');
      }

      return response.json();
    },
    validateToken: async (token) => {
      const response = await fetch('http://localhost:8080/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Invalid or expired token');
      }

      return response.json();
    },
    logout: async () => {
      await delay(500);
      localStorage.removeItem('user');
    },
    resetPassword: async (token, password) => {
      const response = await fetch(`http://localhost:8080/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Password reset failed');
      }

      return response.json();
    },
    getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('user'));
    }
  },

  categories: {
    getAll: async () => {
      const response = await fetch('http://localhost:8080/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to fetch category');
      }
      const data = await response.json();
      return data;
    },
    getById: async (id) => {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch category');
      }
      const data = await response.json();
      return data.body; // Backend returns { body: categoryObject }
    },
    create: async (categoryData) => {
      const response = await fetch('http://localhost:8080/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
        credentials: 'include',
        redirect: 'manual',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to create category');
      }

      return response.json();
    },
    update: async (id, categoryData) => {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
        credentials: 'include',
        redirect: 'manual',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to update category');
      }

      return response.json();
    },
    delete: async (id) => {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to delete category');
      }
      return id;
    }
  },

  transactions: {
    getAll: async () => {
      const response = await fetch(`http://localhost:8080/transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch tracking details');
      }
      const data = await response.json();
      return data.body;
    },
    getById: async (id) => {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch transaction');
      }
      const text = await response.text();
      if (!text) return {};
      const data = JSON.parse(text);
      return data.body !== undefined ? data.body : data;
    },
    create: async (transaction) => {
      const response = await fetch('http://localhost:8080/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
        credentials: 'include',
        redirect: 'manual',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.body || 'Failed to create transaction');
      }

      const data = await response.json();
      return data.body || data;
    },
    update: async (id, transaction) => {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
        credentials: 'include',
        redirect: 'manual',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update transaction');
      }

      const text = await response.text();
      if (!text) return {};
      const data = JSON.parse(text);
      return data.body || data;
    },
    delete: async (id) => {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        redirect: 'manual',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete transaction');
      }
      return id;
    },
    bulkUpload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`http://localhost:8080/transactions/bulk-upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',

      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.body || 'Bulk upload failed');
      }

      return response.json();
    }
  },

  analytics: {
    getOverview: async () => {
      await delay(1000);
      // Generate some demo data for charts
      return {
        categoryDistribution: [
          { name: 'Food', value: 400 },
          { name: 'Rent', value: 1200 },
          { name: 'Entertainment', value: 300 },
          { name: 'Utilities', value: 200 },
        ],
        monthlyData: [
          { month: 'Jan', income: 2500, expense: 1800 },
          { month: 'Feb', income: 2800, expense: 2100 },
          { month: 'Mar', income: 3200, expense: 1900 },
        ]
      };
    }
  }
};

export default api;
