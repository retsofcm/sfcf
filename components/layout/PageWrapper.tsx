'use client';
import { usePathname } from 'next/navigation';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isIndex = pathname === '/';

  return (
    <main className={`overflow-x-hidden flex-1 space-y-12 md:space-y-20 ${isIndex ? '' : 'pt-10 md:pt-20 mt-[108px]'}`}>
      {children}
    </main>
  );
};
