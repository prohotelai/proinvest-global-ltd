import { redirect } from 'next/navigation';
import { auth } from '@/lib/ppn/auth';

export const metadata = {
  title: 'Partner Portal | ProInvest Partner Network',
};

export default async function PPNLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is logged in for protected routes
  // This layout is for the partner portal section
  
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  );
}
