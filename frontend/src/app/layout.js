import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI WorkSpace",
  description: "A unified platform for AI-powered research writing, chat assistants, summarization tools, and more — designed to boost productivity and creativity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-white overflow-x-hidden">

        {/* Grid background */}
        <div
          className="absolute -mt-10 inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_24px]"
        />

        {children}

      </body>
    </html>
  );
}
