/* eslint-disable react/jsx-fragments */
import React from 'react';

import Footer from '@/components/desktop/Footer';

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col items-center">
      <div className="flex flex-1">{props.children}</div>
      <Footer />
    </main>
  );
}
