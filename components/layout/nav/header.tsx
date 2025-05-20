"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "../layout-context";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import MobileMenuDrawer from './MobileMenuDrawer';

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const pathname = usePathname();
  const isIndex = pathname === "/";

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
    <header className={`${isIndex ? "group" : ""} ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <nav
        data-state={menuState && "active"}
        className={`
          bg-white fixed top-0 left-0 z-20 w-full transition-colors duration-300 md:hover:!bg-white
          ${
            isIndex
              ? scrollY < 108
                ? "!bg-transparent"
                : "bg-white/80"
              : scrollY < 108
              ? "bg-white"
              : "bg-white/80"
          }
        `}
      >
        <div className="mx-auto max-w-7xl transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 px-4 md:px-0">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 w-[100px] md:w-auto"
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
                  {header.nav!.map((item, index) => {
                    const hasDropdown = item!.links && item!.links.length > 0;
                    const [showDropdown, setShowDropdown] = useState(false);
                    const dropdownTimeout = React.useRef<NodeJS.Timeout | null>(null);

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
                        key={index}
                        className="group/link relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {
                          item!.url ? (
                            <Link
                              href={item!.url}
                              className="block py-2 border-b-2 border-transparent group-hover/link:border-black"
                            >
                              <span>{item!.title}</span>
                            </Link>
                          ) : (
                            <div className="block py-2 border-b-2 border-transparent group-hover/link:border-black cursor-default">
                              <span>{item!.title}</span>
                            </div>
                          )
                        }

                        {hasDropdown && (
                          <div
                            className={`
                              absolute -left-6 top-0 z-30 pt-8 transition-all duration-300
                              ${showDropdown ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
                            `}
                          >
                            <div className="absolute left-0 top-full z-30 pt-4">
                              <div
                                className={`
                                  pointer-events-none opacity-0 scale-95 translate-y-2 
                                  group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                                  transition-all duration-300 group-hover:delay-[0ms]
                                  bg-white p-6
                                `}
                              >
                                <div className="grid gap-4">
                                  {item!.links!.map((link, linkIndex) => (
                                    <Link
                                      key={linkIndex}
                                      href={link!.url || ""}
                                      className="block whitespace-nowrap text-base text-gray-700"
                                    >
                                      {link!.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
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
