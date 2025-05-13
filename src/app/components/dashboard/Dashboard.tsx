"use client";

import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import ProjectProgress from '../widgets/projectProgress/ProjectProgress';
import Weather from '../widgets/weather/Weather';
import AnalyticsTags from '../widgets/analyticsTags/AnalyticsTags';
import Stats from '../widgets/stats/Stats';
import Notifications from '../widgets/notifications/Notifications';
import Sidebar from '../sidebar/Sidebar';


type Widget = {
  id: string;
  content: string;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  className: string;
};


const numRows = 6;
const numCols = 6;

const initialWidgets: Widget[] = [
  { id: 'weather', content: 'Weather', row: 0, col: 0, rowSpan: 2, colSpan: 2, className: 'weather' },
  { id: 'project-progress', content: 'Project progress', row: 2, col: 0, rowSpan: 2, colSpan: 2, className: 'project-progress' },
  { id: 'analytics-tags', content: 'Analytics tags', row: 4, col: 0, rowSpan: 2, colSpan: 2, className: 'analytics-tags' },
  { id: 'stats', content: 'Stats', row: 0, col:2, rowSpan: 2, colSpan: 2, className: 'stats' },
  { id: 'notifications', content: 'Notifications', row: 2, col: 2, rowSpan: 2, colSpan: 2, className: 'notifications' },
];




function Dashboard() {
  const isCellOccupied = (row: number, col: number): boolean => {
    return widgets.some(
      (w) =>
        w.id !== draggedWidget?.id && 
        row >= w.row &&
        row < w.row + w.rowSpan &&
        col >= w.col &&
        col < w.col + w.colSpan
    );
  };
  



  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);
  
  const onDragStart = (e: React.DragEvent, widget: Widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.setData("text/plain", widget.id);
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  
    const widgetId = e.dataTransfer.getData("text/plain");
    const widgetToMove = widgets.find((w) => w.id === widgetId);
    if (!widgetToMove) return;
  
    const initialWidget = initialWidgets.find((w) => w.id === widgetId);
    if (!initialWidget) return;
  
    const dashboardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - dashboardRect.left;
    const y = e.clientY - dashboardRect.top;
  
    const colWidth = dashboardRect.width / numCols;
    const rowHeight = dashboardRect.height / numRows;
  
    let col = Math.floor(x / colWidth);
    let row = Math.floor(y / rowHeight);
  
      if (isCellOccupied(row, col)) {
        const queue: [number, number][] = [[row, col]];
        const visited = new Set<string>();
        visited.add(`${row},${col}`);
      
        let found = false;
      
        while (queue.length > 0 && !found) {
          const [currentRow, currentCol] = queue.shift()!;
      
          const neighbors = [
            [currentRow - 1, currentCol], 
            [currentRow + 1, currentCol],
            [currentRow, currentCol - 1],
            [currentRow, currentCol + 1], 
          ];
      
          for (const [neighborRow, neighborCol] of neighbors) {
            if (
              neighborRow >= 0 &&
              neighborRow < numRows &&
              neighborCol >= 0 &&
              neighborCol < numCols &&
              !visited.has(`${neighborRow},${neighborCol}`)
            ) {
              visited.add(`${neighborRow},${neighborCol}`);
      
              if (!isCellOccupied(neighborRow, neighborCol)) {
                row = neighborRow;
                col = neighborCol;
                found = true;
                break;
              }
      
              queue.push([neighborRow, neighborCol]);
            }
          }
        }
      
        if (!found) {
          console.log("Ingen ledige celler tilgjengelig.");
          return;
        }
      }

    let maxRowSpan = 0;
    let maxColSpan = 0;
  
    for (let r = row; r < numRows; r++) {
      if (isCellOccupied(r, col)) break;
      maxRowSpan++;
    }
  
    for (let c = col; c < numCols; c++) {
      if (isCellOccupied(row, c)) break;
      maxColSpan++;
    }
  
    const fitsInitialSize =
      maxRowSpan >= initialWidget.rowSpan && maxColSpan >= initialWidget.colSpan;
  
    const finalRowSpan = fitsInitialSize
      ? initialWidget.rowSpan 
      : Math.min(widgetToMove.rowSpan, maxRowSpan); 
    const finalColSpan = fitsInitialSize
      ? initialWidget.colSpan
      : Math.min(widgetToMove.colSpan, maxColSpan); 
  
    const fits = widgets.every((w) => {
      if (w.id === widgetId) return true;
  
      const isRowOverlap =
        row < w.row + w.rowSpan && row + finalRowSpan > w.row;
      const isColOverlap =
        col < w.col + w.colSpan && col + finalColSpan > w.col;
  
      return !(isRowOverlap && isColOverlap); 
    });
  
    if (!fits) {
      console.log("Ikke nok plass til å plassere widgeten.");
      return;
    }
  
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === widgetId
          ? { ...w, row, col, rowSpan: finalRowSpan, colSpan: finalColSpan }
          : w
      )
    );
  
    setDraggedWidget(null);
  };
  

  const renderWidget = (widget: Widget) => {
    switch (widget.className) {
      case 'weather':
        return <Weather />;
      case 'project-progress':
        return <ProjectProgress />;
      case 'analytics-tags':
        return <AnalyticsTags />;
      case 'stats':
        return <Stats />;
      case 'notifications':
        return <Notifications />;
      default:
        return null;
    }
  };


  

  return (
    <div className={styles.dashboardWrapper}>
      <Sidebar widgets={widgets} />
      <div
        className={styles.dashboard}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
       {Array.from({ length: numRows }).map((_, row) =>
          Array.from({ length: numCols }).map((_, col) => {
            const occupied = isCellOccupied(row, col);
            return (
              <div
                key={`cell-${row}-${col}`}
                className={`${styles.gridCell} ${occupied ? styles.occupied : ''}`}
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                }}
              />
            );
          })
        )}

        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={`${styles.widget} ${styles[widget.className] || ''}`}
            draggable
            onDragStart={(e) => onDragStart(e, widget)}
            style={{
              gridRow: `${widget.row + 1} / span ${widget.rowSpan}`,
              gridColumn: `${widget.col + 1} / span ${widget.colSpan}`,
            }}
          >
            {renderWidget(widget)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard