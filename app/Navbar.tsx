import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'

const Navbar = () => {
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}, 
    ]
  return (
    <nav className="flex space-x-6 px-5 h-14 border-b mb-5 items-center">
        <Link href="/"><AiFillBug/></Link>
        <ul className='flex space-x-5'>
            {links.map(item => {
                return <li key={item.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'><Link href={item.href}>{item.label}</Link></li>
            })}
        </ul>
    </nav>
  )
}

export default Navbar