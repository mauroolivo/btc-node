'use server';

import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/app/header";
import {listWalletDir, listWallets} from "@/api/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar} from "@/app/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "BTC UI",
//   description: "BTC UI is a web interface for Bitcoin Core",
// };

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {

  const names = (await listWalletDir()).result.wallets.map((w) => w.name);
  // const listLoaded = await listWallets()

  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased w-[100%]`}
    >
    {/*<Header name={null} names={names}/>*/}

    <SidebarProvider>
      <AppSidebar name={null} names={names} />
      <SidebarTrigger />
        {/*<div className="items-start p-8 pb-20 gap-16 sm:p-20">*/}
        {/*  <main className="gap-[32px] row-start-2  sm:items-start">*/}
            <main className="p-2">
            {children}
          </main>
        {/*</div>*/}

    </SidebarProvider>
    </body>
    </html>
  );
}
