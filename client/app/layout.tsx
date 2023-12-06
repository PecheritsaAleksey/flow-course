"use client";

import "node_modules/react-modal-video/css/modal-video.css";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
});

const NOT_LAYOUT_COMPONENTS = ["/signin", "/signup", "/error"];

const LayoutComponents = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const CurrentLayout = NOT_LAYOUT_COMPONENTS.includes(pathname)
    ? React.Fragment
    : LayoutComponents;

  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="dark:bg-black">
        <Providers>
          <AuthWrapper>
            <CurrentLayout>{children}</CurrentLayout>
            <ScrollToTop />
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
