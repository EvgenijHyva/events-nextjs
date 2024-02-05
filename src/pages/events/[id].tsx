"use client"
import { useRouter } from 'next/router';
import { getEventById } from '../../../dummy-data';
import { notFound } from 'next/navigation';
import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';

export default function EventsID() {
	const router = useRouter()

	const { id } = router.query;
	console.log(router.query, router.pathname)

	if (!id || typeof id !== "string") {
		return;
	}
	const event = getEventById(id);

	if (!event) {
		notFound();
	}

	return (<>
		<EventSummary title={event.title} />
		<EventLogistics {...event} />
		<EventContent>
			<p>{event.description}</p>
		</EventContent>
	</>);
}