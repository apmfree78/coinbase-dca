import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { QueryClientProvider, setLogger } from "react-query";
import { generateQueryClient } from "react-query/queryClient";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "redux/store";
import { MemoryRouter } from "react-router-dom";

import { GlobalProvider } from "./state/context";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

// make a function to generate a unique query client for each test
const generateQueryTestClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = generateQueryTestClient();
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GlobalProvider>{children}</GlobalProvider>;
        </Provider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
