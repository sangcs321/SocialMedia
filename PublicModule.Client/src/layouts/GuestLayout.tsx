import React from "react";

interface GuestLayoutProps {
  children: React.ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
  return <div>{children}</div>;
};
