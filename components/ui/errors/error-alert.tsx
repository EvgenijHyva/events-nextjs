import { LayoutProps } from '../../layout/layout';
import styles from './error-alert.module.css';
import Head from 'next/head';
interface AlertProps extends Pick<LayoutProps, "children"> { }

export default function ErrorAlert(props: AlertProps) {
	return <>
		<Head>
			<title>Not found</title>
		</Head>
		<div className={styles.alert}>
			{props.children}
		</div>
	</>;
}

