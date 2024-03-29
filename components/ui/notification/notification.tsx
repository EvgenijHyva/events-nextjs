import { useContext } from 'react';

import styles from './notification.module.css';
import { NotificationContext } from '../../../store/notification-context';
import { NotificationProps } from '../../../helpers/types';

export default function Notification(props: NotificationProps) {
	const notificationCtx = useContext(NotificationContext);

	const { title, message, status } = props;

	let statusClasses = '';

	if (status.toLowerCase() === 'success') {
		statusClasses = styles.success;
	}

	if (status.toLowerCase() === 'error') {
		statusClasses = styles.error;
	}

	if (status.toLowerCase() === 'pending') {
		statusClasses = styles.pending;
	}

	const activeClasses = `${styles.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={notificationCtx.hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};