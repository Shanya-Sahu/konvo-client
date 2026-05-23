import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "@/context";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Import Jost font
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Konvo – Real-Time Chat & Group Messaging App",
  description:
    "Konvo is a modern chat app that lets you connect instantly with friends and groups. Enjoy real-time messaging, seamless conversations, and a clean, user-friendly experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <GlobalStateProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
