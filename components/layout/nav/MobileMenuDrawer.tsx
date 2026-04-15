'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus } from 'lucide-react';
import { useLayout } from '../layout-context';

export default function MobileMenuDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { globalSettings } = useLayout();
  const nav = globalSettings?.header?.nav ?? [];
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[95%] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end p-4 border-b">
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 gap-2">
          {nav.map((item, idx) => {
            const title = item!.title ?? '';
            const links = item!.links?.filter(Boolean);
            const isDropdown = item!.links && item!.links.length > 0;
            const isOpenDropdown = openDropdown === item!.title;

            if (isDropdown) {
              return (
                <div key={idx}>
                  <button
                    onClick={() =>
                      setOpenDropdown(isOpenDropdown ? null : title)
                    }
                    className="flex justify-between w-full py-2 text-left text-lg font-medium text-black items-center"
                  >
                    {title}
                    <span>{isOpenDropdown ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</span>
                  </button>
                  {isOpenDropdown && (
                    <div className="pl-4 space-y-1">
                      {links!.map((link, linkIdx) => (
                        <Link
                          key={linkIdx}
                          href={link!.url || ""}
                          onClick={onClose}
                          className="block py-1 text-base text-black"
                        >
                          {link!.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item!.url!}
                onClick={onClose}
                className="block py-2 text-lg font-medium text-black hover:text-logo-green"
              >
                {item!.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
