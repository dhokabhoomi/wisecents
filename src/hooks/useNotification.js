import { useState, useRef, useCallback } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const timeoutRef = useRef(null);

  const show = useCallback((message, type = "info") => {
    clearTimeout(timeoutRef.current);
    setNotification({ message, type });
    timeoutRef.current = setTimeout(() => setNotification(null), 3000);
  }, []);

  const clear = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setNotification(null);
  }, []);

  return { notification, show, clear };
};
