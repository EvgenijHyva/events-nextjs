"use client"
import { ReactElement } from 'react';
import styles from "./button.module.css";
import Link from 'next/link';

interface ButtonProps {
	href: string;
	children: string | ReactElement
};

export default function Button({ href, children }: ButtonProps) {
	return <Link href={href} className={styles.btn}>{children}</Link>
};