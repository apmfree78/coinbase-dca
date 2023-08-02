'use client';

import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../react-query/queryClient';
import { GlobalProvider } from 'context';
import { AuthProvider } from 'auth/authContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ThemeProvider
          attribute='class'
          enableSystem={false}
          defaultTheme='dark'
        >
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
