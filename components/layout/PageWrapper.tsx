'use client';
import { usePathname } from 'next/navigation';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isIndex = normalizedPath === '/';

  return (
    <main className={`overflow-x-hidden flex-1 space-y-12 lg:space-y-20 ${isIndex ? '' : 'pt-10 lg:pt-20 mt-[108px]'}`}>
      {children}
    </main>
  );
};
