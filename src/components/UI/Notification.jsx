import React from "react";
import "./Notification.css";

const Notification = React.memo(({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
      <button onClick={onClose} aria-label="Close notification">
        &times;
      </button>
    </div>
  );
});

export default Notification;
