

import styles from './ProjectProgress.module.css'

const ProjectProgress = () => {
  return (
    <div className={styles.widgetContainer}>
      <h2 className={styles.title}>Project Tasks</h2>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
      </div>
      <p className={styles.status}>72% completed</p>
    </div>
  );
};

export default ProjectProgress;
