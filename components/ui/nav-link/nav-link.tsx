"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react'

interface NavLinkProps {
	href: string,
	children: ReactElement | string;
}

export default function NavLink({ href, children }: NavLinkProps) {
	const path = usePathname();
	return (
		<Link href={href}> {children} </Link>
	);
}