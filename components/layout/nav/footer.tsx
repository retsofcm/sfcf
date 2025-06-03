"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Logo } from "./logo";
import { Plus, Minus } from 'lucide-react';


export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  const contact = footer?.contact;

  // State for toggling accordion on mobile
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    social: false,
    footerColumns: Array(footer?.columns?.length).fill(false),
  });

  const toggleAccordion = (section: string, index?: number) => {
    if (section === "social") {
      setIsAccordionOpen({ ...isAccordionOpen, social: !isAccordionOpen.social });
    } else if (section === "footerColumns" && index !== undefined) {
      const newColumnsState = [...isAccordionOpen.footerColumns];
      newColumnsState[index] = !newColumnsState[index];
      setIsAccordionOpen({ ...isAccordionOpen, footerColumns: newColumnsState });
    }
  };

  return (
    <footer className="w-full bg-white pt-10 mt-10 lg:pt-20 lg:mt-20 border-t self-end">
      <div className="container grid grid-cols-4 lg:grid-cols-12 gap-8">
        {/* Logo */}
        <div className="flex flex-col gap-4 col-span-4 lg:col-span-3 justify-between items-center lg:items-start">
          <Link href="/" className="w-fit">
            <Logo />
          </Link>
          <div className="flex gap-4">
            {footer?.social?.map((link, index) => (
              <Link
                key={`${link!.icon}${index}`}
                href={link!.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  data={{
                    ...link!.icon,
                    size: "xs",
                    name: link!.icon?.name || "default-icon-name",
                    style: link!.icon?.style as "circle" | "regular" | null,
                  }}
                  className="text-muted-foreground hover:text-primary"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Accordion: Footer Columns */}
        <div className="col-span-4 lg:col-span-6 flex flex-col lg:flex-row gap-4 justify-between">
          {footer?.columns?.map((col, idx) => (
            col ? (
              <div key={idx} className="flex flex-col gap-4 text-sm">
                {/* Title and toggle only on mobile */}
                <div
                  className="flex justify-between items-center cursor-pointer lg:cursor-default lg:block"
                  onClick={() => toggleAccordion("footerColumns", idx)}
                >
                  <span className="font-semibold">{col.title}</span>
                  <span className="lg:hidden">
                    {isAccordionOpen.footerColumns[idx] ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </div>

                {/* Links: accordion on mobile, always shown on md+ */}
                <div
                  className={`flex-col gap-1 ${
                    isAccordionOpen.footerColumns[idx] ? "flex" : "hidden"
                  } lg:flex`}
                >
                  {col.links?.map((link, i) =>
                    link ? (
                      <Link
                        key={i}
                        href={link.url || "#"}
                        className="self-start hover:underline text-muted-foreground"
                      >
                        {link.label}
                      </Link>
                    ) : null
                  )}
                </div>

              </div>
            ) : null
          ))}
        </div>

        {/* Contact Info (always visible) */}
        <div className="text-sm flex flex-col gap-1 col-span-4 lg:col-span-3 text-left lg:text-right">
          <span>{contact?.line1}</span>
          <span>{contact?.line2}</span>
          <span>{contact?.postcode}</span>
          <a href={`mailto:${contact?.email}`} className="self-start lg:self-end mt-4 underline">
            {contact?.email}
          </a>
        </div>

      </div>

      <div className="mt-12 border-t py-6 text-sm text-muted-foreground ">
        <div className="container justify-between items-center text-center flex flex-col gap-2 lg:flex-row">
          <div>© {new Date().getFullYear()} {header?.name}, All rights reserved</div>
          <div className="space-x-4">
            <a href="/privacy-policy" className="text-black">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
