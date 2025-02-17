import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

import './index.css';
import App from './App.tsx';
import AuthProvider from './providers/AuthProvider.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ClerkProvider>
);
