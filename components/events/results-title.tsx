import Button from '../ui/button/button';
import styles from './results-title.module.css';

interface ResultsTitleProps {
	date: string;
}

export default function ResultsTitle(props: ResultsTitleProps) {
	const { date } = props;

	const humanReadableDate = new Date(date).toLocaleDateString('fi-FI', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<section className={styles.title}>
			<h1>Events in {humanReadableDate}</h1>
			<Button href='/events'>Show all events</Button>
		</section>
	);
};
