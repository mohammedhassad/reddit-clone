import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Reddit Clone</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
