'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Image from "next/image";
export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (
      <Navbar fluid rounded className="header">
        <NavbarBrand
          // href="https://flowbite-react.com"

        >
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="BTC UI Logo"
          />

          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white p-0 m-0">BTC UI</span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/" className={isActive('/') ? "active" : ""}>
            Home
          </NavbarLink>
          <NavbarLink href="/blockchain" className={isActive('/blockchain') ? "active" : ""}>
            Blockchain
          </NavbarLink>
          <NavbarLink href="/explorer" className={isActive('/explorer') ? "active" : ""}>Explorer</NavbarLink>
          <NavbarLink href="/mempool" className={isActive('/mempool') ? "active" : ""}>Mempool</NavbarLink>
          <NavbarLink href="/wallet" className={isActive('/wallet') ? "active" : ""}>Wallet</NavbarLink>
        </NavbarCollapse>
      </Navbar>

    )
}


