import React from "react";
import Script from "next/script";
import { Metadata } from "next";
import { Lato, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  title: "Stenson Fields Christian Fellowship",
  description: "We're a group of Christians who take the Bible seriously and seek to share God's love for every individual in our community and further afield.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(merriweather.variable, lato.variable)}>
      {/* Google Tag: gtag.js */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DM46F7931S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DM46F7931S');
        `}
      </Script>
      <body className="min-h-screen bg-background font-lato antialiased flex flex-col">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
