'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <ApolloProvider client={client}>
      <Toaster />
      {children}
    </ApolloProvider>
  );
}
