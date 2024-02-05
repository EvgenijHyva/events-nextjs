import { FormEventHandler, useRef } from 'react';
import Button from '../ui/button/button';
import styles from "./events-search.module.css";


interface EventsSearchProps {
	onSearch: (year: number, month: number) => void;
}

export default function EventsSearch(props: EventsSearchProps) {

	const yearInputRef = useRef<null | HTMLSelectElement>(null);
	const monthInputRef = useRef<null | HTMLSelectElement>(null);

	const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const year = Number(yearInputRef.current?.value);
		const month = Number(monthInputRef.current?.value);

		if (year && month)
			props.onSearch(year, month);
	}

	return <form className={styles.form} onSubmit={submitHandler}>
		<div className={styles.controls}>
			<div className={styles.control}>
				<label htmlFor='year'>Year</label>
				<select name="year" id="year" ref={yearInputRef}>
					{
						Array.from({ length: 25 }, (_, i) => i + 1)
							.map(num => num + 2000)
							.map(el => <option value={el} key={el}>{el}</option>)
					}
				</select>
			</div>
			<div className={styles.control}>
				<label htmlFor="month">
					Month
				</label>
				<select name="month" id="month" ref={monthInputRef}>
					{
						Array.from({ length: 12 }, (_, i) => i + 1)
							.map(el => {
								const date = new Date();
								date.setMonth(el - 1);
								const monthLocale = date.toLocaleDateString("fi-FI", { month: "long" });
								return <option value={el} key={el}>
									{monthLocale}
								</option>
							})
					}
				</select>
			</div>
			<Button link={false} onClick={() => { console.log("click") }}>
				Find the event
			</Button>
		</div>
	</form>
}