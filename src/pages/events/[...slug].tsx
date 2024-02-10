import EventList from '../../../components/events/event-list';
import ResultsTitle from '../../../components/events/results-title';
import ErrorAlert from '../../../components/ui/errors/error-alert';
import { Event, FirebaseEvents, getFiltedEvents, transFormedData } from '../../../helpers/api-utils';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

interface FilteredEventsProps {
	date: {
		year: string;
		month: string;
	};
	notFound?: boolean;
	events: Event[];
};

const loading = (): JSX.Element => {
	return <p className='center'>Loading...</p>;
}

const errorMessage = (message: string): JSX.Element => {
	return <p className='center'>{message}</p>
}

export default function FilteredEvents({ notFound, date: { year, month }, events }: FilteredEventsProps) {
	const router = useRouter();
	const [pageEvents, setPageEvents] = useState<Event[]>(events);
	const [yearArg, monthArg] = router.query?.slug as string[];

	if (!yearArg || !monthArg) {
		loading();
	}

	// With client side fetch we should switch out getServerSideProps, otherwise it never executes
	const searchDate = `${yearArg}-${+monthArg > 10 ? monthArg : `0${monthArg}`}`;
	const apiUrl = `https://nextjs-events-afd6e-default-rtdb.firebaseio.com/events.json?orderBy="date"&startAt="${searchDate}"&endAt="${+yearArg + 1}"`;
	const { data, error, isLoading } = useSWR(apiUrl);

	if (isLoading) {
		loading();
	}

	if (error) {
		console.log(error);
		errorMessage("Error occured during featch data");
	}

	useEffect(() => {
		if (data) {
			const filteredEvents = transFormedData(data as FirebaseEvents);
			setPageEvents(filteredEvents);
		}
	}, [data]);


	if (notFound) {
		return <ErrorAlert><p>Invalid filter values :(</p></ErrorAlert>;
	}

	const eventsDate = new Date(+year, +month - 1)
	const humanReadableDate = eventsDate.toLocaleDateString("fi-FI", { month: '2-digit', year: "numeric" });

	return <>
		<Head>
			<title>Events from {humanReadableDate}</title>
			<meta name='descripton' content={`Events from ${humanReadableDate}-12.${year}`} />
		</Head>
		<ResultsTitle date={eventsDate.toDateString()} />
		{pageEvents?.length ?
			<EventList events={pageEvents} /> :
			<ErrorAlert>
				<p >No events found on {humanReadableDate} </p>
			</ErrorAlert>}
	</>

}

// prerendering on Server
export const getServerSideProps: GetServerSideProps = async (context) => {
	const [year, month] = context.params?.slug as string[];

	if (isNaN(+year) || isNaN(+month) || +month < 1 || +month > 12) {
		return {
			props: {
				notFound: true // customization in component side
			}
			// notFound: true, // use notfound function for show the error
			//	redirect: { // in case if custom error page
			//		destination: "/error-page"
			//	}
		}
	}

	const events = await getFiltedEvents({ year, month });

	return {
		props: {
			date: {
				year,
				month,
			},
			events
		}
	}
}