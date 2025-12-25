import React from "react";
import { Header } from "components";

interface GuestLayoutProps {
  children: React.ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
