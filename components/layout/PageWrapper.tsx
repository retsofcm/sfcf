'use client';
import { usePathname } from 'next/navigation';

export const PageWrapper = ({ children, isHome }: { children: React.ReactNode, isHome?: boolean }) => {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isIndex = isHome !== undefined ? isHome : (normalizedPath === '/');

  return (
    <main className={`overflow-x-hidden flex-1 space-y-12 lg:space-y-20 ${isIndex ? '' : 'pt-10 lg:pt-20 mt-[72px] lg:mt-[108px]'}`}>
      {children}
    </main>
  );
};
