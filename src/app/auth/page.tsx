import { Metadata } from 'next';
import AuthPageClient from './AuthPageClient';

export const metadata: Metadata = {
  title: 'Login & Register - Hamleys | Access Your Account',
  description: 'Sign in to your Hamleys account or create a new one to access exclusive features, track orders, and save your favorites.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return <AuthPageClient />;
}