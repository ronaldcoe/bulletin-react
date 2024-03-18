'use client'
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { usePathname } from 'next/navigation'
import { AuthProvider } from './context/AuthContext';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Bulletin React",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <AuthProvider>
        {pathname !== '/login' && pathname !== '/signup' && <Navbar />}
        <Toaster position="top-center" />
          <main className="max-w-[1000px] mt-28 px-5 mx-auto">
            {children}
          </main>
        </AuthProvider>  
      </body>
      
      
    </html>
  );
}
