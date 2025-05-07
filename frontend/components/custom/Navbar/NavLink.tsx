"use client";
import Link from "next/link";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "nprogress/nprogress.css";


type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?:()=>void
};

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    const handleClick = () => {
        NProgress.start();
        if (onClick) {
            onClick();
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};

export default NavLink;
