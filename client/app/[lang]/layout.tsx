"use client";

import "node_modules/react-modal-video/css/modal-video.css";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../../styles/index.css";

import { defaultLocale } from "@/middleware";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
});

const NOT_LAYOUT_COMPONENTS = ["/signin", "/signup", "/error"];

const LayoutComponents = ({ children, lang }) => {
  return (
    <>
      <Header lang={lang} />
      {children}
      <Footer />
    </>
  );
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const pathname = usePathname();

  const CurrentLayout = NOT_LAYOUT_COMPONENTS.includes(pathname)
    ? React.Fragment
    : LayoutComponents;

  return (
    <html suppressHydrationWarning lang={params.lang ?? defaultLocale}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="dark:bg-black">
        <Providers>
          <AuthWrapper>
            <CurrentLayout lang={params.lang}>{children}</CurrentLayout>
            <ScrollToTop />
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
