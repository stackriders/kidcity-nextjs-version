import { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Register - Hamleys | Create Your Account',
  description: 'Create a new Hamleys account to access exclusive features, track orders, and save your favorites.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}