import styles from "./event-item.module.css";
import Button from '../ui/button/button';
import DateIcon from '../ui/icons/date-icon';
import AddressIcon from '../ui/icons/address-icon';
import ArrowRightIcon from '../ui/icons/arrow-right-icon';
import { Event } from '../../helpers/api-utils';

interface EventItemProps {
	event: Event;
};

export default function EventItem({ event }: EventItemProps) {

	const humanReadableDate = new Date(event.date).toLocaleDateString("fi-FI", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "short"
	});

	const formatedAddress = event.location.replace(", ", "\n");

	const exploreLink = `/events/${event.id}`;

	const imageSrc = `/${event.image}`;

	return (
		<li className={styles.item}>
			<img src={imageSrc} alt={event.title} className={styles.image} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{event.title}</h2>
					<div className={styles.date}>
						<DateIcon />
						<time>
							{humanReadableDate}
						</time>
					</div>
					<div className={styles.address}>
						<AddressIcon />
						<address>
							{formatedAddress}
						</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button href={exploreLink} >
						<span> Explore event
							<span className={styles.icon}><ArrowRightIcon /></span>
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
};