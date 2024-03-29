"use client"
import Head from 'next/head';
import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';
import Comments from '../../../components/input/comments';
import { Event, getEventById, getFeaturedEvents } from '../../../helpers/api-utils';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface EventIdProps {
	event: Event;
}

interface ContextParams extends ParsedUrlQuery {
	id: string;
}

export default function EventsID({ event }: EventIdProps) {
	return (event ? <>
		<Head>
			<title>Event: {event.title.toString()}</title>
			<meta name='Event name' content={event.title} />
			<meta name='keywords' content={event.title} />
			<meta name='descriptiom' content={event.description} />
		</Head>
		<EventSummary title={event.title} />
		<EventLogistics {...event} />
		<EventContent>
			<p>{event.description}</p>
		</EventContent>
		<Comments eventId={event.id} />
	</> : <div className='center'>
		<p>Loading...</p>
	</div>);
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
	const events = await getFeaturedEvents();
	const paths = (events as Event[]).map(event => ({ params: { id: event.id } }));
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