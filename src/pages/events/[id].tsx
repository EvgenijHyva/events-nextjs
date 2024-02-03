"use client"
import { useRouter } from 'next/router';

export default function EventsID() {
	const router = useRouter()
	console.log(router.query, router.pathname)
	return (<>
		There is Event by ID
	</>)
}