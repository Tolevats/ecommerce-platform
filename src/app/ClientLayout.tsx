"use client";

import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import React from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <>
      {!isLandingPage && <Header />}
      <main>{children}</main> {/* Ensure children is rendered here */}
    </>
  );
};

export default ClientLayout;
