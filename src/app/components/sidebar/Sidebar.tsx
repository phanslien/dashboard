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
      <h3>Available Widgets</h3>
      <ul>
        {widgets.map((widget) => (
          <li key={widget.id}  className={styles.widgetItem}>{widget.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
