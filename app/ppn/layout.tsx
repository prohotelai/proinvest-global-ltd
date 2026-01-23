import { auth } from '@/lib/ppn/auth';
import { Providers } from './providers';

export const metadata = {
  title: 'Partner Portal | ProInvest Partner Network',
};

export default async function PPNLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session for future use in protected routes
  await auth();

  // This layout is for the partner portal section
  // SessionProvider is required for useSession() hook in client components
  
  return (
    <Providers>
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    </Providers>
  );
}
