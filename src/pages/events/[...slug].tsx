import EventList from '../../../components/events/event-list';
import ResultsTitle from '../../../components/events/results-title';
import ErrorAlert from '../../../components/ui/errors/error-alert';
import { GetServerSideProps } from 'next';
import { Event, getFiltedEvents } from '../../../helpers/api-utils';

interface FilteredEventsProps {
	date: {
		year: string;
		month: string;
	};
	notFound?: boolean;
	events: Event[];
};

export default function FilteredEvents({ notFound, date: { year, month }, events }: FilteredEventsProps) {

	if (notFound) {
		return <ErrorAlert><p>Invalid filter values :(</p></ErrorAlert>;
	}

	const eventsDate = new Date(+year, +month - 1)
	const humanReadableDate = eventsDate.toLocaleDateString("fi-FI", { month: '2-digit', year: "numeric" });

	return <>
		<ResultsTitle date={eventsDate.toDateString()} />
		{events?.length ?
			<EventList events={events} /> :
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