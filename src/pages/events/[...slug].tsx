import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../../components/events/event-list';
import ResultsTitle from '../../../components/events/results-title';
import ErrorAlert from '../../../components/ui/errors/error-alert';

export default function FilteredEvents() {
	const router = useRouter();

	if (router.query?.slug?.length !== 2) {
		return <p className='center'>Loading...</p>;
	}

	const [year, month] = router.query?.slug as string[];

	if (isNaN(+year) || isNaN(+month) || +month < 1 || +month > 12) {
		return <ErrorAlert><p>Invalid filter values :(</p></ErrorAlert>;
	}

	const events = getFilteredEvents({ year, month });

	const date = new Date()
	date.setMonth(+month - 1);
	date.setFullYear(+year)
	return <>
		<ResultsTitle date={date.toDateString()} />
		{events?.length ?
			<EventList events={events} /> :
			<ErrorAlert>
				<p >No events found on {date.toLocaleDateString("fi-FI", { month: '2-digit', year: "numeric" })} </p>
			</ErrorAlert>}
	</>

}

export async function getStaticProps(context: any) {
	console.log(context)
}