

import styles from './Weather.module.css'

const Weather = () => {
  return (
    <div className={styles.weather}>
      <h2 className={styles.title}>Weather</h2>
      <p className={styles.temp}>🌡️ 18°C</p>
      <p className={styles.status}>☀️ Sunny</p>
    </div>
  );
};

export default Weather;