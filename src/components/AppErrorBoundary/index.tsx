import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div
      className='fui-bg-error-400 fui-text-sm fui-text-white'
      data-testid='TestId__AppErrorBoundary'
    >
      <p data-testid='TestId__ErrorFallbackTitle'>Something went wrong:</p>
      <pre data-testid='TestId__ErrorFallbackMessage'>{error?.message}</pre>
    </div>
  );
};

export const AppErrorBoundary: React.FC<any> = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);
