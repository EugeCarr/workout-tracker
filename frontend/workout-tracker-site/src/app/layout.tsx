"use server"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import SiteBanner from "./components/SiteBanner";
import { cookies } from "next/headers";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const firstName: string | undefined = cookies().get("first_name")?.value
  return (
    <html 
      lang="en"
    >
      <body
        style={{
          height: "100%"
        }}
      >
        <SiteBanner first_name={firstName}/>
          <div
            className="page-background"
          >
            {children}
          </div>        
      </body>
    </html>
  );
}

export default RootLayout