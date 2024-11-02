import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Syne, Orbitron } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'BlackBox Events - Trading Bar',
  description: 'Système de gestion innovant avec prix dynamiques',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${spaceGrotesk.variable} ${syne.variable} ${orbitron.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}