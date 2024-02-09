import { Inter } from "next/font/google";
import EventList from '../../components/events/event-list';
import { Event, getFeaturedEvents } from '../../helpers/api-utils';


const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  featuredEvents: Event[]
}

export default function Home({ featuredEvents }: HomeProps) {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 1800 // prod optimization, dev is not affected
  }
}