import styles from "./page.module.css";
import Dashboard from "./components/dashboard/Dashboard";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.h1}>Dashboard</h1>
        <Dashboard />
      </main>
      <footer className={styles.footer}>
      
      </footer>
    </div>
  );
}
