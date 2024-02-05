import AddressIcon from '../icons/address-icon';;
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import styles from './event-logistics.module.css';
import { Event } from '../../dummy-data';

interface EventLogisticsProps extends Pick<Event, "date" | "image" | "location" | "title"> { }

export default function EventLogistics(props: EventLogisticsProps) {
  const { date, location, image, title } = props;

  console.log(props)
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = location?.replace(', ', '\n');

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={`/${image}`} alt={title} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

