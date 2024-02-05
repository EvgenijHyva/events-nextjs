import { useRouter } from 'next/router';

export default function FilteredEvents() {
	const router = useRouter();

	console.log(router.query, router.pathname)
	return <>

	</>

}