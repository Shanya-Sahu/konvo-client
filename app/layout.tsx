import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
