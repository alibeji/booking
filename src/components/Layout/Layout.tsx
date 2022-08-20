import React, { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
