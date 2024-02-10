import { Inter } from "next/font/google";
import EventList from '../../components/events/event-list';
import { Event, getFeaturedEvents } from '../../helpers/api-utils';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  featuredEvents: Event[]
}

export default function Home({ featuredEvents }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Upcomming events</title>
        <meta name='description' content='Find a lot of great events for yourself' />
        <meta name='teck-stack' content='nextjs & typescript' />
        <meta name='created by' content='Evgeny Hyvärinen' />
      </Head>
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