"use client"
import { ReactElement } from 'react';
import styles from "./button.module.css";
import Link from 'next/link';

interface ButtonProps {
	href: string;
	children: string | ReactElement;
	link?: true;
	onClick?: () => void;
};

interface ButtonPropsAsLink extends Pick<ButtonProps, "children"> {
	href?: string;
	link: false;
	onClick: () => void;
}

export default function Button({ href, children, link = true, onClick }: ButtonProps | ButtonPropsAsLink) {
	if (link) {
		if (!href) {
			throw new Error("href attr is required! with Link")
		}
		return <Link href={href} className={styles.btn}>{children}</Link>
	} else {
		return <button className={styles.btn} onClick={onClick}>{children}</button>
	}
};