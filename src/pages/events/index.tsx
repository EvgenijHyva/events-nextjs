import EventList from '../../../components/events/event-list';
import EventsSearch, { NumericSearchParams } from '../../../components/events/events-search';
import { getAllEvents } from '../../../dummy-data';
import { useRouter } from 'next/router';


export default function Events() {
	const router = useRouter();
	const events = getAllEvents();

	const findEventHandler = (year: NumericSearchParams, month: NumericSearchParams) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}
	return <>
		<EventsSearch onSearch={findEventHandler} />
		<EventList events={events} />
	</>;
}