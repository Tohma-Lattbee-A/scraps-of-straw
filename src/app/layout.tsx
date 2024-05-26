import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  style: 'normal',
  weight: ["300", "400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "藁くず",
  description: "text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.className}`}>{children}</body>
    </html>
  );
}
