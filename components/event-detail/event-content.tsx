import styles from './event-content.module.css';

interface EventContentProps {
  children: JSX.Element | string;
}

export default function EventContent({ children }: EventContentProps) {
  return (
    <section className={styles.content}>
      {children}
    </section>
  );
}

