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
    <footer className="bg-white pt-20 mt-20 border-t">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-8">
        {/* Logo */}
        <div className="flex flex-col gap-4 col-span-3 justify-between">
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

        {/* Footer Columns */}
        {footer?.columns?.map((col, idx) => (
          col ? ( 
            <div key={idx} className="flex flex-col gap-4 text-sm col-span-2">
              <span className="font-semibold">{col.title}</span>
              {col.links?.map((link, i) => (
                link ? (
                  <Link key={i} href={link.url || "#"} className="self-start hover:underline text-muted-foreground">
                    {link.label}
                  </Link>
                ) : null
              ))}
            </div>
          ) : null
        ))}

        {/* Contact Info */}
        <div className="text-sm text-right flex flex-col gap-1 col-span-3">
          <span>{contact?.line1}</span>
          <span>{contact?.line2}</span>
          <span>{contact?.postcode}</span>
          <a href={`mailto:${contact?.email}`} className="self-end mt-4 underline">
            {contact?.email}
          </a>
        </div>
      </div>

      <div className="mt-12 border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {header?.name}, All rights reserved
      </div>
    </footer>
  );
};
