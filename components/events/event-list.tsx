import { Event } from '../../helpers/api-utils';
import EventItem from './event-item';
import styles from "./event-list.module.css"

interface EventProps {
	events: Event[]
}

export default function EventList({ events }: EventProps) {
	return <ul className={styles.list}>
		{events.map(event => <EventItem event={event} key={event.id} />)}
	</ul>
}