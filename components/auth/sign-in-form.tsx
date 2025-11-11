'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Success - redirect to home
      router.push('/');
      router.refresh();
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo/Brand */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-4xl">☕</span>
          <span className="text-2xl font-bold text-white">Ember Coffee Co.</span>
        </Link>
        <p className="mt-2 text-gray-300">Sign in to your account</p>
      </div>

      {/* Form Card */}
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              placeholder="••••••••"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#3E2723] focus:ring-[#3E2723]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#3E2723] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-[#3E2723] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Back to Shop */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}