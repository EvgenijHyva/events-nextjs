import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../../components/events/event-list';

export default function FilteredEvents() {
	const router = useRouter();

	if (router.query?.slug?.length !== 2) {
		return <p className='center'>Loading...</p>;
	}

	const [year, month] = router.query?.slug as string[];

	if (isNaN(+year) || isNaN(+month) || +month < 1 || +month > 12) {
		return <p className='center'>Invalid filter values :(</p>;
	}

	const events = getFilteredEvents({ year, month });

	const date = new Date()
	date.setMonth(+month - 1);
	date.setFullYear(+year)
	return <>
		{events?.length ?
			<EventList events={events} /> :
			<p className='center'>No events found on {date.toLocaleDateString("fi-FI", { month: '2-digit', year: "numeric" })} </p>}
	</>

}