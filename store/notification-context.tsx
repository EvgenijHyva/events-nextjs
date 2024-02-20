import { createContext, useState, useEffect } from 'react';
import { NotificationProps } from '../helpers/types';

interface NotificationContext {
	notification: null | NotificationProps;
	showNotification: (notification: NotificationProps) => void
	hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContext>({
	notification: null, // title message status
	showNotification: () => { },
	hideNotification: () => { }
});

interface NotificationContextProviderProps {
	children: JSX.Element;
}


export const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => {
	const [activeNotification, setActiveNotification] = useState<null | NotificationProps>(null);

	useEffect(() => {
		if (
			activeNotification?.status.toLowerCase() === "success" ||
			activeNotification?.status.toLowerCase() === "error"
		) {
			const timer = setTimeout(() => {
				setActiveNotification(null);
			}, 4000)
			// cleanup
			return () => {
				clearTimeout(timer);
			}
		}
	}, [activeNotification])

	const showNotificationHandler = (notificationData: NotificationProps) => {
		setActiveNotification(notificationData);
	}

	const hideNotificationHandler = () => {
		setActiveNotification(null);
	}

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler
	}

	return (
		<NotificationContext.Provider value={context}>
			{children}
		</NotificationContext.Provider>
	);
}

