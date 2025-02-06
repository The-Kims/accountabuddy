// tests/test-utils.tsx
import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import ReactQueryProvider from '../client/react-query-provider';
import TRPCProvider from '../client/trpc-provider';

type ProvidersProps = { children: ReactNode };

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <ReactQueryProvider>
    <TRPCProvider>{children}</TRPCProvider>
  </ReactQueryProvider>
);

const renderWithContext = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { renderWithContext };
