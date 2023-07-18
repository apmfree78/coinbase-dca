import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './react-query/queryClient';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from 'context';
import { AuthProvider } from 'auth/authContext';
import 'tailwind.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  </React.StrictMode>
);
