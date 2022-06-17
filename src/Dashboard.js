import React, { useState } from "react";

const WIDGET_LIST = [
  { id: "a", content: "A", size: 1 },
  { id: "b", content: "B", size: 1 },
  { id: "c", content: "C", size: 1 },
  { id: "d", content: "D", size: 1 },
  { id: "e", content: "E", size: 2 },
  { id: "f", content: "F", size: 1 },
  { id: "g", content: "G", size: 1 },
  { id: "h", content: "H", size: 2 },
  { id: "i", content: "I", size: 1 },
  { id: "j", content: "J", size: 1 },
];

function Widget({ content, onDragStart }) {
  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        borderRadius: "5px",
        minHeight: "10rem",
        padding: "1rem 1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", paddingBottom: "0.5rem" }}>
        <p style={{ flex: "1", margin: "0rem" }}>Title {content}</p>
        <div onDragStart={onDragStart} draggable>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "2rem",
          flex: "1",
          borderRadius: "5px",
          fontSize: "4rem",
          color: "#cccccc",
        }}
      >
        {content}
      </div>
    </div>
  );
}

function WidgetContainer({
  onDrop,
  children,
  onDragEnter,
  onDragLeave,
  isDraggedOver,
  size,
}) {
  return (
    <div
      style={
        isDraggedOver
          ? {
              border: "dashed 2px #abcdef",
              borderRadius: "5px",
              minHeight: "5rem",
              boxSizing: "border-box",
              gridColumn: `span ${size}`,
            }
          : { gridColumn: `span ${size}` }
      }
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      {!isDraggedOver && children}
    </div>
  );
}

export function Dashboard() {
  const [widgets, setWidgets] = useState(WIDGET_LIST);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [draggedOverContainerId, setDraggedOverContainerId] = useState(null);

  const handleDragStart = (id) => setDraggedItemId(id);
  const handleDragEntered = (id) => setDraggedOverContainerId(id);
  const handleDragLeave = () => setDraggedOverContainerId(null);

  const handleDrop = () => {
    if (!draggedOverContainerId) {
      clearState();
      return;
    }

    const fromIndex = widgets.findIndex((w) => w.id === draggedItemId);
    const toIndex = widgets.findIndex((w) => w.id === draggedOverContainerId);
    setWidgets((w) => moveItem(w, fromIndex, toIndex));

    clearState();
  };

  const clearState = () => {
    setDraggedItemId(null);
    setDraggedOverContainerId(null);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "1rem",
      }}
    >
      {widgets.map((w, i) => (
        <WidgetContainer
          key={w.id}
          onDrop={handleDrop}
          onDragEnter={() => handleDragEntered(w.id)}
          onDragLeave={handleDragLeave}
          isDraggedOver={w.id === draggedOverContainerId}
          size={w.size}
        >
          <Widget
            content={w.content}
            onDragStart={() => handleDragStart(w.id)}
          />
        </WidgetContainer>
      ))}
    </div>
  );
}

export function moveItem(list, from, to) {
  const listClone = [...list];
  if (from < to) {
    listClone.splice(to + 1, 0, listClone[from]);
    listClone.splice(from, 1);
  } else if (to < from) {
    listClone.splice(to, 0, listClone[from]);
    listClone.splice(from + 1, 1);
  }
  return listClone;
}

// export function moveItemOriginal(list, from, to) {
//   console.log(`Swapping from ${from} to ${to}`);
//   if (from < to) {
//     return [
//       ...list.slice(0, from),
//       ...list.slice(from + 1, to + 1),
//       list[from],
//       ...list.slice(to + 1),
//     ];
//   } else if (to < from) {
//     return [
//       ...list.slice(0, to),
//       list[from],
//       ...list.slice(to, from),
//       ...list.slice(from + 1),
//     ];
//   }
//   return [...list];
// }
