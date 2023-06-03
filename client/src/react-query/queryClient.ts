import { QueryClient } from 'react-query';
import { useGlobalContext } from 'context';

// const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  const { showToast } = useGlobalContext();
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';
  console.warn(title);

  showToast(title, 'error');
}

// to satisfy typescript until this file has uncommented contents
export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // 15 minutes
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
