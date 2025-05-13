import React from 'react';
import styles from './Stats.module.css'

const Stats = () => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.statTitle}>Visitors</span>
        <span className={styles.statValue}>1,234</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statTitle}>Sales</span>
        <span className={styles.statValue}>567</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statTitle}>Alerts</span>
        <span className={styles.statValue}>3</span>
      </div>
    </div>
  );
};

export default Stats;

