'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (
        <header
            className="flounder:pt-0 flounder:pb-px z-header pointer-events-auto transition-colors flounder:h-[48px] flex
            fixed inset-x-0 top-0 bg-backgroundPrimaryDefault after:absolute after:inset-x-0 after:bottom-0 after:border-b after:border-itemSecondaryMute py-2 w-screen"
            id="header" aria-labelledby="header" >
            <div className="flex items-center justify-between w-full px-4">
                <div className="flex flounder:flex-1">
                    <div className="flex items-center gap-4">
                        <div className="p-3 h-full w-[40px]"></div>
                        <div className="flex gap-4 justify-center items-center">
                            <div className="header flex gap-8 justify-center items-center">
                                <Link
                                    className={isActive('/') ? "active" : ""}
                                    href={`/`}>Home</Link>
                                <Link
                                    className={isActive('/blockchain') ? "active" : ""}
                                    href={`/blockchain`}>Blockchain</Link>
                                <Link
                                    className={isActive('/explorer') ? "active" : ""}
                                    href={`/explorer`}>Explorer</Link>
                                <Link
                                    className={isActive('/wallet') ? "active" : ""}
                                    href={`/wallet`}>Wallet</Link>
                            </div>
                        </div>
                    </div>
                </div>
                { /*
                <div className="hidden flounder:flex flounder:gap-x-12"></div>
                <div className="flex flounder:flex-1 flounder:justify-end">
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-4 justify-center items-center">
                            <div className="flex gap-2 justify-center items-center">
                                <Link
                                    className="group/button inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-0 transition-[color,background,box-shadow] focus-visible:outline-brandDefault focus-visible:-outline-offset-1 focus-visible:outline-1 disabled:pointer-events-none outline-none uppercase underline-offset-4 hover:underline py-2 px-[16px] flounder:px-6 flounder:py-3 text-mobileBody2 flounder:text-desktopBody2 gap-1 flounder:gap-2 font-mono -my-3 -mx-4 flounder:-mx-6 flounder:-my-3 disabled:text-backgroundPrimaryOnMute data-[disabled]:!text-backgroundPrimaryOnMute !no-underline"
                                    href={`/blog`}>Blog</Link>
                                <Link
                                    className="group/button inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-0 transition-[color,background,box-shadow] focus-visible:outline-brandDefault focus-visible:-outline-offset-1 focus-visible:outline-1 disabled:pointer-events-none outline-none uppercase underline-offset-4 hover:underline py-2 px-[16px] flounder:px-6 flounder:py-3 text-mobileBody2 flounder:text-desktopBody2 gap-1 flounder:gap-2 font-mono -my-3 -mx-4 flounder:-mx-6 flounder:-my-3 disabled:text-backgroundPrimaryOnMute data-[disabled]:!text-backgroundPrimaryOnMute !no-underline"
                                    href={`/blog/${blog_id}`}>Blog detail</Link>
                            </div>
                        </div>
                    </div>
                </div>
                */}
            </div>
        </header>
    )
}


