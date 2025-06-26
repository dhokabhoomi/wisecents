import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNotification } from "./hooks/useNotification";

const SpendingChart = lazy(() =>
  import("./components/SummaryDashboard/SpendingChart")
);

import DataManager from "./components/DataManager";
import "./App.css";

// Feature Components
import SummaryDashboard from "./components/SummaryDashboard/SummaryDashboard";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";

// UI Components
import Card from "./components/UI/Card";
import Notification from "./components/UI/Notification";
import Navbar from "./components/Navbar/Navbar";
import Button from "./components/UI/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [transactions, setTransactions] = useLocalStorage(
    "wiseCents_Transactions",
    []
  );
  const [darkMode, setDarkMode] = useLocalStorage("wiseCents_DarkMode", false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    notification,
    show: showNotification,
    clear: clearNotification,
  } = useNotification();

  // Set theme via HTML data attribute
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleToggleDarkMode = useCallback(
    () => setDarkMode((prev) => !prev),
    [setDarkMode]
  );

  // CRUD Operations with Notifications
  const transactionHandlers = useMemo(
    () => ({
      add: (tx) => {
        setTransactions((prev) => [...prev, { ...tx, id: Date.now() }]);
        showNotification("Transaction added!", "success");
        setIsModalOpen(false);
      },
      update: (updatedTx) => {
        setTransactions((prev) =>
          prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
        );
        showNotification("Transaction updated!", "info");
        setIsModalOpen(false);
        setEditTransaction(null);
      },
      delete: (id) => {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
        showNotification("Transaction deleted.", "error");
      },
      openAdd: () => {
        setEditTransaction(null);
        setIsModalOpen(true);
      },
      openEdit: (tx) => {
        setEditTransaction(tx);
        setIsModalOpen(true);
      },
    }),
    [setTransactions, showNotification]
  );

  const filteredTransactions = useMemo(
    () =>
      transactions
        .filter(
          (tx) => categoryFilter === "all" || tx.category === categoryFilter
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions, categoryFilter]
  );

  return (
    <div className="App">
      {notification && (
        <Notification notification={notification} onClose={clearNotification} />
      )}
      <Navbar darkMode={darkMode} onToggleDark={handleToggleDarkMode} />
      <main className="main-content">
        <DataManager
          transactions={transactions}
          onImport={(data) => {
            setTransactions(data);
            showNotification("Data imported!", "success");
          }}
        />
        <Button onClick={transactionHandlers.openAdd} variant="primary">
          Add Transaction
        </Button>
        <Card>
          <h1 className="app-title">Financial Dashboard</h1>

          <SummaryDashboard transactions={transactions} darkMode={darkMode} />

          <div className="grid-layout">
            <div className="grid-column">
              <Suspense
                fallback={
                  <div className="loading-placeholder">Loading chart...</div>
                }
              >
                <SpendingChart
                  transactions={transactions}
                  darkMode={darkMode}
                />
              </Suspense>
            </div>

            <div className="grid-column">
              <CategoryFilter
                value={categoryFilter}
                onChange={setCategoryFilter}
              />

              <TransactionList
                transactions={filteredTransactions}
                onDelete={transactionHandlers.delete}
                onEdit={transactionHandlers.openEdit}
              />
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TransactionForm
                  onSubmit={
                    editTransaction
                      ? transactionHandlers.update
                      : transactionHandlers.add
                  }
                  editTx={editTransaction}
                />
              </Modal>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
