"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import SiteBanner from "./components/SiteBanner";
import {AuthProvider } from "./contexts/AuthenticationContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html 
      lang="en"
    >
      <body>
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
