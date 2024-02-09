export interface Event {
	id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	image: string;
	isFeatured: boolean;
};

export interface EventFilter {
	year: string;
	month: string;
};

interface FirebaseObj extends Omit<Event, "id"> { };
interface FirebaseEvents extends Record<string, FirebaseObj> { };

const APIURL = "https://nextjs-events-afd6e-default-rtdb.firebaseio.com/events.json";

const transformFirebaseObj = (data: FirebaseObj, id: string): Event => ({ id, ...data });

const transFormedData = (data: FirebaseEvents): Event[] => {
	const events = [];
	for (const key in data) {
		events.push(transformFirebaseObj(data[key], key));
	}
	return events;
};

export const getFeaturedEvents = async () => {
	return fetch(`${APIURL}?orderBy="isFeatured"&equalTo=true`)
		.then(data => data.json() as Promise<FirebaseEvents>)
		.then(transFormedData)
		.catch(console.log);
};

export const getAllEvents = async () => {
	return fetch(APIURL)
		.then(data => data.json() as Promise<FirebaseEvents>)
		.then(transFormedData)
		.catch(console.log);
};

export const getFiltedEvents = async (dateFilter: EventFilter) => {
	const { year, month } = dateFilter;
	const date = `${year}-${+month > 10 ? month : `0${month}`}`;
	return fetch(`${APIURL}?orderBy="date"&startAt="${date}"&endAt="${+year + 1}"`)
		.then(data => data.json() as Promise<FirebaseEvents>)
		.then(transFormedData)
		.catch(console.log);
};

export const getEventById = async (id: string | null): Promise<Event | null | void> => {
	if (!id)
		return null;
	return fetch(`https://nextjs-events-afd6e-default-rtdb.firebaseio.com/events/${id}.json`)
		.then(data => data.json() as Promise<FirebaseObj>)
		.then(data => transformFirebaseObj(data, id))
		.catch(console.log)
};