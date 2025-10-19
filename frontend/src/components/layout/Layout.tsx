import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-green-500/20 mt-16 py-6 text-center text-gray-400">
        <p>KeyVora - Secure Encrypted Notes</p>
      </footer>
    </div>
  );
}
