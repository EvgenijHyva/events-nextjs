import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { getFeaturedEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}
