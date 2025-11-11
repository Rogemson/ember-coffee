import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata = {
  title: 'Sign In - Ember Coffee Co.',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#3E2723] to-[#2C1810] px-4 py-12">
      <SignInForm />
    </div>
  );
}