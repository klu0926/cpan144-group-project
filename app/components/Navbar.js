'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


function NavLink({ href, isActive, children }) {
  return (
    <Link
      className={`cursor-pointer text-blue-400 py-0.5 px-3 rounded-t -mb-3 ${isActive ? "bg-white font-bold" : "bg-gray-300"}`}
      href={href}>
      {children}
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex gap-3 py-3 px-10 bg-blue-400">
      <NavLink href={'/'} isActive={pathname == '/'}>Home</NavLink>
      <NavLink href={'/favorites'} isActive={pathname === '/favorites'}>Favorites</NavLink>
      <NavLink href={'/about'} isActive={pathname === '/about'}>About Us</NavLink>
    </div>
  )
}