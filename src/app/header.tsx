'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

import Image from "next/image";
import React from "react";
export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (

  <nav className={"flex flex-wrap gap-8 uppercase justify-end p-4 header"}>
    <Link href="/" className={isActive('/') ? "active" : ""}>Home</Link>
    <Link href="/blockchain" className={isActive('/blockchain') ? "active" : ""}>Blockchain</Link>
    <Link href="/explorer" className={isActive('/explorer') ? "active" : ""}>Explorer</Link>
    <Link href="/mempool" className={isActive('/mempool') ? "active" : ""}>Mempool</Link>
    <Link href="/wallet" className={isActive('/wallet') ? "active" : ""}>Wallet</Link>
  </nav>
    )
}


