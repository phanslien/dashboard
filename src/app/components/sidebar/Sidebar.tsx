
import styles from './Sidebar.module.css';

type Widget = {
  id: string;
  name: string;
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
          <li key={widget.id}  className={styles.widgetItem}>{widget.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
