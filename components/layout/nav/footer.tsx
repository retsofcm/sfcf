"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Logo } from "./logo";

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
    <footer className="w-full bg-white pt-10 mt-10 md:pt-20 md:mt-20 border-t self-end">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-4 md:grid-cols-12 md:px-0 gap-8">
        {/* Logo */}
        <div className="flex flex-col gap-4 col-span-4 md:col-span-3 justify-between items-center md:items-start">
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
        {footer?.columns?.map((col, idx) => (
          col ? (
            <div key={idx} className="flex flex-col gap-4 text-sm col-span-4 md:col-span-2">
              {/* Title and toggle only on mobile */}
              <div
                className="flex justify-between items-center cursor-pointer md:cursor-default md:block"
                onClick={() => toggleAccordion("footerColumns", idx)}
              >
                <span className="font-semibold">{col.title}</span>
                <span className="md:hidden">
                  {isAccordionOpen.footerColumns[idx] ? "▲" : "▼"}
                </span>
              </div>

              {/* Links: accordion on mobile, always shown on md+ */}
              <div
                className={`flex-col gap-1 ${
                  isAccordionOpen.footerColumns[idx] ? "flex" : "hidden"
                } md:flex`}
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

        {/* Contact Info (always visible) */}
        <div className="text-sm flex flex-col gap-1 col-span-4 md:col-span-3 text-left md:text-right">
          <span>{contact?.line1}</span>
          <span>{contact?.line2}</span>
          <span>{contact?.postcode}</span>
          <a href={`mailto:${contact?.email}`} className="self-start md:self-end mt-4 underline">
            {contact?.email}
          </a>
        </div>

      </div>

      <div className="mt-12 border-t px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {header?.name}, All rights reserved
      </div>
    </footer>
  );
};
