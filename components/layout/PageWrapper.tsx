'use client';
import { usePathname } from 'next/navigation';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isIndex = pathname === '/';

  return (
    <main className={`overflow-x-hidden ${isIndex ? '' : 'pt-20'}`}>
      {children}
    </main>
  );
};
