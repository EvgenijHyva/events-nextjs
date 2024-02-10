import EventList from '../../../components/events/event-list';
import EventsSearch from '../../../components/events/events-search';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Event, getAllEvents } from '../../../helpers/api-utils';

interface EventsProps {
	events: Event[]
}

export default function Events({ events }: EventsProps) {
	const router = useRouter();

	const findEventHandler = (year: number, month: number) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}
	return <>
		<Head>
			<title>All events</title>
		</Head>
		<EventsSearch onSearch={findEventHandler} />
		<EventList events={events} />
	</>;
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events
		},
		revalidate: 60 // every minute for request it will regenerate
	};
}; 