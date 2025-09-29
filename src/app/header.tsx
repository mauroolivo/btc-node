'use client'
import Link from "next/link";
import {usePathname} from 'next/navigation';
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Header({name, names} : {
  name?: string | null,
  names?: string[]
}) {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    function wallets(): React.JSX.Element[] | undefined {
      return names?.map((name, i) => {
        return (
          <li key={i}>
            <NavigationMenuLink asChild>
              <Link href={"/wallet/" + name}>{name === "" ? "`default`" : name}</Link>
            </NavigationMenuLink>
          </li>
        )
      });
    }
    return (

  // <nav className={"flex flex-wrap gap-8 uppercase justify-end p-4 header"}>
  //   <Link href="/" className={isActive('/') ? "active" : ""}>Home</Link>
  //   <Link href="/blockchain" className={isActive('/blockchain') ? "active" : ""}>Blockchain</Link>
  //   <Link href="/explorer" className={isActive('/explorer') ? "active" : ""}>Explorer</Link>
  //   <Link href="/mempool" className={isActive('/mempool') ? "active" : ""}>Mempool</Link>
  //   <Link href="/wallet" className={isActive('/wallet') ? "active" : ""}>Wallet</Link>
  // </nav>

      <div className={"uppercase header"}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/blockchain">Blockchain</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/explorer">Explorer</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/mempool">Mempool</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Wallets</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                { wallets() }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
      </div>
    )
}


