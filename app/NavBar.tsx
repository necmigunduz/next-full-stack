import Link from "next/link";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const NavBar = () => {
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
              className="text-zinc-600 hover:text-zinc-300 text-lg transition-colors"
              href="link?.href"
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
