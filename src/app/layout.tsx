import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import logSmall from "../assets/images/small-logo.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sumitomo",
  icons: logSmall.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
