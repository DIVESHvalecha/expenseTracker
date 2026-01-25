# ExpenseTracker - Premium Finance Manager

A modern, glassmorphism-styled expense tracking application built with React, Vite, and Tailwind CSS. Featuring premium dark aesthetics, smooth animations, and a clean API-ready architecture.

## 🚀 Key Features
- **Modern UI**: Full dark-theme glassmorphism design with soft neon green accents.
- **Premium Animations**: Powered by Framer Motion for smooth page transitions and micro-interactions.
- **API-Ready Architecture**: Centralized `api.js` service for easy backend integration.
- **Interactive Analytics**: Visual insights using Recharts with animated entry.
- **State Management**: Real-time updates with Zustand global state.
- **Fully Responsive**: Optimized for desktop and mobile viewports.

## 📱 Pages
- **Landing Page**: Animated hero section with premium SaaS call-to-actions.
- **Authentication**: Modern Glass UI for Login, Registration, and Password Reset.
- **Home Dashboard**:
  - **Stat Cards**: Real-time balance, income, and expense tracking.
  - **Category Manager**: Create and organize custom colored categories.
  - **Transaction Management**: Quick entry for income/expenses with category classification.
  - **Transaction List**: Beautifully styled history with delete animations.
- **Analytics**: Comprehensive charts showing category distribution and monthly trends.

## 🔧 API Integration Guide

This application is designed to be "backend-plugged". All data fetching and mutation logic is centralized in:
`src/services/api.js`

### How to connect to a real backend:
1. Open `src/services/api.js`.
2. Replace the `delay()` and mock data variables with global constants for your API URL.
3. Replace the mock function bodies with `fetch` or `axios` calls.
   
Example replacement for `categories.getAll()`:
```javascript
// From:
getAll: async () => {
    await delay(500);
    return [...categories];
},

// To:
getAll: async () => {
    const response = await fetch(`${API_URL}/categories`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
},
```

The Zustand store in `src/store/useStore.js` will automatically handle the new async data flow since the API service preserves the same Promise-based interface.

## 🛠️ Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **State**: Zustand
- **Toasts**: Sonner
- **Routing**: React Router DOM

## 💻 Getting Started
1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:5173`

---
Built with ❤️ for a premium financial experience.
