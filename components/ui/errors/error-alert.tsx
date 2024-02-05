import { LayoutProps } from '../../layout/layout';
import styles from './error-alert.module.css';

interface AlertProps extends Pick<LayoutProps, "children"> { }

export default function ErrorAlert(props: AlertProps) {
	return <div className={styles.alert}>{props.children}</div>;
}

