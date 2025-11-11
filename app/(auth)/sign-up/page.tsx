import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata = {
  title: 'Sign Up - Ember Coffee Co.',
  description: 'Create your account',
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3E2723] to-[#2C1810] px-4 py-12">
      <SignUpForm />
    </div>
  );
}