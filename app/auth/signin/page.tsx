"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const loadProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    loadProviders();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">RepurposeX</h1>
          <p className="text-sm text-gray-400 mt-2">
            Sign in to save and manage your AI-generated posts
          </p>
        </div>

        {/* Providers */}
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button
                key={provider.id}
                onClick={() => {
                  setLoading(provider.id);
                  signIn(provider.id, {
                    callbackUrl: "/",
                    });
                }}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20 disabled:opacity-50"
              >
                {provider.name === "Google" && (
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                )}

                {provider.name === "GitHub" && (
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                  />
                )}

                <span>
                  {loading === provider.id
                    ? "Redirecting..."
                    : `Continue with ${provider.name}`}
                </span>
              </button>
            ))}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}