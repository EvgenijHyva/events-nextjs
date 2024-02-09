"use client"
import { useRouter } from 'next/router';
import { notFound } from 'next/navigation';
import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';
import { Event, getEventById } from '../../../helpers/api-utils';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getFeaturedEvents } from '../../../dummy-data';

interface EventIdProps {
	event: Event;
}

interface ContextParams extends ParsedUrlQuery {
	id: string;
}

export default function EventsID({ event }: EventIdProps) {
	return (event ? <>
		<EventSummary title={event.title} />
		<EventLogistics {...event} />
		<EventContent>
			<p>{event.description}</p>
		</EventContent>
	</> : <div className='center'>
		<p>Loading...</p>
	</div>);
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map(event => ({ params: { id: event.id } }));
	return {
		paths,
		fallback: "blocking"
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { id } = context.params as ContextParams;
	const event = await getEventById(id)

	return {
		props: { event },
		revalidate: 30 // new request regenation after 30s, prod optimization 
	}
} 