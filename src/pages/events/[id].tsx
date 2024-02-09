"use client"
import { useRouter } from 'next/router';
import { notFound } from 'next/navigation';
import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';
import { Event, getEventById } from '../../../helpers/api-utils';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllEvents } from '../../../dummy-data';

interface EventIdProps {
	event: Event;
}

interface ContextParams extends ParsedUrlQuery {
	id: string;
}

export default function EventsID({ event }: EventIdProps) {

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

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
	const events = await getAllEvents();
	const paths = events.map(event => ({ params: { id: event.id } }));
	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { id } = context.params as ContextParams;
	const event = await getEventById(id)

	return { props: { event } }
} 