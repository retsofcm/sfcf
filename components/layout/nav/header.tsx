"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "../layout-context";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import MobileMenuDrawer from './MobileMenuDrawer';

interface NavItemProps {
  item: {
    title?: string | null;
    url?: string | null;
    links?: ({ label?: string | null; url?: string | null } | null)[] | null;
  };
}

const NavItem = ({ item }: NavItemProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasDropdown = item.links && item.links.length > 0;

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <li
      className="group/link relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.url ? (
        <Link
          href={item.url}
          className="block py-2 border-b border-transparent group-hover/link:border-black"
        >
          <span>{item.title}</span>
        </Link>
      ) : (
        <div className="block py-2 border-b border-transparent group-hover/link:border-black cursor-default">
          <span>{item.title}</span>
        </div>
      )}

      {hasDropdown && (
        <div
          className={`
            absolute -left-6 top-full z-30 pt-2 w-max min-w-[calc(100%+3rem)] transition-all duration-300
            ${showDropdown ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
          `}
        >
          <div className="bg-white p-6 shadow-lg w-full">

            <div className="grid gap-4">

              {item.links?.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link?.url || ""}
                  className="block whitespace-nowrap text-base text-black hover:text-green transition-colors"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </li>
  );
};

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings?.header;
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isIndex = normalizedPath === '/';

  const [menuState, setMenuState] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
  
    const update = () => {
      const currentY = window.scrollY;
      setScrollingUp(currentY < lastY || currentY < 20);
      setScrollY(currentY);
      lastY = currentY;
      ticking = false;
    };
  
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const scrolled = scrollY > 108;
  const showWhiteBg = scrolled;
  const showLightTheme = !isIndex || showWhiteBg;

  return (
    <header className={`fixed top-0 left-0 w-full z-40 ${isIndex ? "group" : ""} ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <nav
        data-state={menuState && "active"}
        className={`
          bg-white fixed top-0 left-0 z-20 w-full transition-colors duration-300 lg:hover:!bg-white
          ${
            isIndex
              ? scrollY < 108
                ? "!bg-transparent"
                : "bg-white/80"
              : "bg-white/80"
          }
        `}
      >
        <div className="container transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 w-[100px] lg:w-auto outline-none focus:outline-none"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className={`relative z-20 block cursor-pointer p-2.5 lg:hidden transition-colors duration-300
                  ${showLightTheme ? "" : "text-white"}
                `}
              >
                <Menu className="m-auto size-6 transition duration-300" />
              </button>

              <div className="hidden lg:block">
                <ul
                  className={`
                    flex gap-8 text-xl transition-colors duration-300 group-hover:text-black
                    ${showLightTheme ? "text-black" : "text-white"}
                  `}
                >
                  {header?.nav?.map((item, index) => (
                    item ? <NavItem key={index} item={item} /> : null
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenuDrawer isOpen={menuState} onClose={() => setMenuState(false)} />
    </header>
  );
};
