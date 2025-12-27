// "use client"
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// // import App from '@/src/App';

// export default function SyntheticV0PageForDeployment() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   if (!session) {
//     // Redirect to login if not authenticated
//     router.push('/api/auth/signin?');
//     return null;
//   }

//   return <App />;
// }

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RepurposeClient from "./RepurposeClient";

export default async function RepurposePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <RepurposeClient />;
}