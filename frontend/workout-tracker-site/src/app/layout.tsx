import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import SiteBanner from "./components/SiteBanner";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
    >
      <body 
      >
        <SiteBanner/>
        <div
          className="page-background"
        >
          {children}
        </div>
        
      </body>
    </html>
  );
}