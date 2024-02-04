import React from "react";
import NavBar from "../_components/navbar";

import { Section } from "../_components/layout/Section";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Section yPadding="0">
        <NavBar />
      </Section>
      {children}
    </>
  );
};

export default Layout;
