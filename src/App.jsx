import { useState } from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import SummaryDashboard from "./components/SummaryDashboard/SummaryDashboard";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const addTransaction = (newTr) => {
    setTransactions([newTr, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const startEdit = (tx) => {
    setEditTx(tx);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
    setEditTx(null);
  };

  const filteredTransactions =
    filterCategory === "all"
      ? transactions
      : transactions.filter((tx) => tx.category === filterCategory);

  return (
    <div className="container mt-4">
      <h2>WiseCents - Expense Tracker</h2>
      <SummaryDashboard transactions={transactions} />
      <TransactionForm
        onAdd={addTransaction}
        onUpdate={updateTransaction}
        editTx={editTx}
      />
      <CategoryFilter
        selected={filterCategory}
        setSelected={setFilterCategory}
      />
      <TransactionList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
        onEdit={startEdit}
      />
    </div>
  );
}

export default App;
