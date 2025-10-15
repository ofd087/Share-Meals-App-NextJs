"use client";

import classes from "./NavLink.module.css";
// REACT/NEXT
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <>
      <Link
        href={href}
        className={
          path.startsWith(href)
            ? `${classes.active} ${classes.link}`
            : classes.link
        }
      >
        {children}
      </Link>
    </>
  );
}
