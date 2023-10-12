'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currPath = usePathname();
  console.log(currPath == '/');
  
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 px-5 h-14 border-b mb-5 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((item) => {
          return (
            <Link
                key={item.href}
              href={item.href}
              className={classNames({
                "text-zinc-950": item.href == currPath,
                "text-zinc-500": item.href != currPath,
                "hover: text-zinc-800 transition-colors": true,
              })}
            >
              {item.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
