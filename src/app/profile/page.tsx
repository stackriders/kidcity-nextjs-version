import { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProfilePageClient from './ProfilePageClient';

export const metadata: Metadata = {
  title: 'My Profile - Hamleys | Account Settings',
  description: 'Manage your Hamleys account, view order history, and update your preferences.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageClient />
    </ProtectedRoute>
  );
}