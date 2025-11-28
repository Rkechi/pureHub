"use client";
import { createContext, useContext, useState, useCallback } from 'react';
import PageLoader from '@/components/loaders/PageLoader';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  message: string;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  message: 'Loading...',
});

export function useLoading() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  const startLoading = useCallback((msg = 'Loading...') => {
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, message }}>
      {children}
      {isLoading && <PageLoader message={message} />}
    </LoadingContext.Provider>
  );
}