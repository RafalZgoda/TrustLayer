import Header from "./Header";
import Footer from "./Footer";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

import BlueCircle from "../components/BlueCircle";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <div className="absolute -top-20 -left-[32rem] -z-10">
        <BlueCircle />
      </div>

      <main className="container mx-auto">{children}</main>
      <div className="absolute top-40 -right-[32rem] -z-10">
        <BlueCircle />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
