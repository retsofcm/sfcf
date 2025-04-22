"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Logo } from "./logo";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  const contact = footer?.contact;

  return (
    <footer className="bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Logo />
          <div className="flex gap-4">
            {footer?.social?.map((link, index) => (
              <Link
                key={`${link!.icon}${index}`}
                href={link!.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  data={{ ...link!.icon, size: "small" }}
                  className="text-muted-foreground hover:text-primary"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Columns */}
        {footer?.columns?.map((col, idx) => (
          col ? ( // Check if col is not null or undefined
            <div key={idx} className="flex flex-col gap-2 text-sm">
              <span className="font-semibold mb-2">{col.title}</span>
              {col.links?.map((link, i) => (
                <Link key={i} href={link.url || "#"} className="hover:underline text-muted-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null // If col is null, return null instead of rendering the content
        ))}

        {/* Contact Info */}
        <div className="text-sm text-muted-foreground flex flex-col gap-1">
          <span>{contact?.line1}</span>
          <span>{contact?.line2}</span>
          <span>{contact?.postcode}</span>
          <a href={`mailto:${contact?.email}`} className="hover:underline">
            {contact?.email}
          </a>
        </div>
      </div>

      <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {header?.name}, All rights reserved
      </div>
    </footer>
  );
};
