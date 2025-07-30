"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import App from '@/src/App';

export default function SyntheticV0PageForDeployment() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    // Redirect to login if not authenticated
    router.push('/api/auth/signin?');
    return null;
  }

  return <App />;
}