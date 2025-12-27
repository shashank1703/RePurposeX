import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/components/providers/auth-provider';

export const metadata: Metadata = {
  title: 'repurposeX',
  description: 'Created by shashank',
  generator: 'shashank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
