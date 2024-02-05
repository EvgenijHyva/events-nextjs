import React from 'react';
import styles from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: React.FC;
  children: JSX.Element | string;
}

export default function LogisticsItem(props: LogisticsItemProps) {
  const { icon: Icon } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{props.children}</span>
    </li>
  );
}

