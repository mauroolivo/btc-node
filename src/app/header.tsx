'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

import Image from "next/image";
import React from "react";
export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (
      // <div className={" flex flex-wrap gap-8 uppercase justify-end"}>
      //   <div className={""} onClick={() => {setCurrent(Tab.INFO)}}>Wallet info</div>
      //   <div className={""} onClick={() => {setCurrent(Tab.TRANSACTION)}}>Transactions</div>
      //   <div className={""} onClick={() => {setCurrent(Tab.UNSPENT)}}>UTXO</div>
      //   <div className={""} onClick={() => {setCurrent(Tab.ADDRESS)}}>Addresses</div>
      //   <div className={""} onClick={() => {setCurrent(Tab.DESCRIPTOR)}}>Descriptor</div>
      // </div>
  <nav className={"flex flex-wrap gap-8 uppercase justify-end p-4 header"}>
    <Link href="/blockchain" className={isActive('/blockchain') ? "active" : ""}>Blockchain</Link>
    <Link href="/explorer" className={isActive('/explorer') ? "active" : ""}>Explorer</Link>
    <Link href="/mempool" className={isActive('/mempool') ? "active" : ""}>Mempool</Link>
    <Link href="/wallet" className={isActive('/wallet') ? "active" : ""}>Wallet</Link>

  </nav>
      // <Navbar fluid rounded className="header">
      //   <NavbarBrand
      //
      //
      //   >
      //     <Image
      //       src="/logo.png"
      //       width={50}
      //       height={50}
      //       alt="BTC UI Logo"
      //     />
      //
      //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white p-0 m-0">BTC UI</span>
      //   </NavbarBrand>
      //   <NavbarToggle />
      //   <NavbarCollapse>
      //     <NavbarLink href="/" className={isActive('/') ? "active" : ""}>
      //       Home
      //     </NavbarLink>
      //     <NavbarLink href="/blockchain" className={isActive('/blockchain') ? "active" : ""}>
      //       Blockchain
      //     </NavbarLink>
      //     <NavbarLink href="/explorer" className={isActive('/explorer') ? "active" : ""}>Explorer</NavbarLink>
      //     <NavbarLink href="/mempool" className={isActive('/mempool') ? "active" : ""}>Mempool</NavbarLink>
      //     <NavbarLink href="/wallet" className={isActive('/wallet') ? "active" : ""}>Wallet</NavbarLink>
      //   </NavbarCollapse>
      // </Navbar>

    )
}


