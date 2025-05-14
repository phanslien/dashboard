

import styles from './Notifications.module.css'

const Notifications = () => {
  return (
    <div className={styles.notifications}>
      <div className={styles.card}>🔔 You have a new message.</div>
      <div className={styles.card}>📦 Order #1234 has been shipped.</div>
      <div className={styles.card}>📅 Upcoming meeting at 14:00.</div>
      <div className={styles.card}>🛠️ System update available.</div>
    </div>
  );
};

export default Notifications;
