

import styles from './AnalyticsTags.module.css'

const AnalyticsTags = () => {
  return (
    <div className={styles.analyticsTags}>
      <span className={styles.tag}>Analytics</span>
      <span className={styles.tag}>Users</span>
      <span className={styles.tag}>Reports</span>
      <span className={styles.tag}>Insights</span>
      <span className={styles.tag}>Conversions</span>
      <span className={styles.tag}>Performance</span>
    </div>
  );
};

export default AnalyticsTags;
