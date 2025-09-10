import { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Login - Hamleys | Access Your Account',
  description: 'Sign in to your Hamleys account to access exclusive features, track orders, and save your favorites.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}