import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "wiseCents_Transactions";

export function useLocalStorageTransactions(initialValue = []) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  return [transactions, setTransactions];
}
