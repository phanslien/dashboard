import React from 'react';
import styles from './Sidebar.module.css';

type Widget = {
  id: string;
  content: string;
};

type SidebarProps = {
  widgets: Widget[];
};

const Sidebar = ({ widgets }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <h2>Available Widgets</h2>
      <ul>
        {widgets.map((widget) => (
          <li key={widget.id}  className={styles.widgetItem}>{widget.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
