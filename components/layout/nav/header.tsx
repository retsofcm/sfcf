"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const pathname = usePathname();
  const isIndex = pathname === "/";

  const [menuState, setMenuState] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrollingUp(currentY < scrollY || currentY < 20); // still "up" if near top
      setScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const scrolled = scrollY > 20;
  const showWhiteBg = scrolled && scrollingUp;
  const showLightTheme = !isIndex || showWhiteBg; // black text & logo when not on index, or scrolled up

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={`
          z-20 w-full
          ${isIndex ? "fixed top-0 transition-all duration-300" : "relative"}
          ${isIndex && !showWhiteBg ? "bg-transparent border-none" : "bg-white border-b backdrop-blur-3xl"}
          ${scrolled && !scrollingUp ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <div className="mx-auto max-w-7xl transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 px-4 md:px-0">
              <Link href="/" aria-label="home" className="flex items-center space-x-2 w-[100px] md:w-auto">
                <Logo className={showLightTheme ? "" : "fill-white"} />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className={`relative z-20 block cursor-pointer p-2.5 lg:hidden ${showLightTheme ? "" : "text-white"}`}
              >
                <Menu className="m-auto size-6 transition duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className={`flex gap-8 text-xl transition-colors duration-300 ${showLightTheme ? "text-black" : "text-white"}`}>
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className={`block duration-150 hover:opacity-70`}
                      >
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className={`space-y-6 text-base ${showLightTheme ? "text-black" : "text-white"}`}>
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className={`block duration-150 hover:opacity-70`}
                      >
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
