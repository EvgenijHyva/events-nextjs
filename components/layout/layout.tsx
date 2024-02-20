import { useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../../components/ui/notification/notification';
import { NotificationContext } from '../../store/notification-context';

export interface LayoutProps {
	children: JSX.Element
}

export default function Layout(props: LayoutProps) {
	const appContext = useContext(NotificationContext);

	return <>
		<MainHeader />
		<main>
			{props.children}
		</main >
		{appContext.notification && <Notification
			message={appContext.notification.message}
			title={appContext.notification.title}
			status={appContext.notification.status}
		/>}

	</>;
}