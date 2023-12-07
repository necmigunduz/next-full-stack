"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-6 h-14 items-center">
      <Link href={"/"}>
        <BsFillBugFill className="text-4xl text-slate-900 hover:text-red-400 transition-colors" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, linkIndex) => (
          <li key={linkIndex}>
            <Link
              className={classnames({
                "text-zinc-900": link?.href === currentPath,
                "text-zinc-500": link?.href !== currentPath,
                "hover:opacity-75": true,
                "hover:text-yellow-400 transition-colors": true,
              })}
              href={link?.href}
            >
              {link?.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
