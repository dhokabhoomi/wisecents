import React from "react";
import Button from "../UI/Button";
import "./TransactionList.css";

const TransactionItem = React.memo(({ tx, onDelete, onEdit }) => {
  return (
    <li className="transaction-item">
      <div className="transaction-content">
        <h3>{tx.description}</h3>
        <p>
          {tx.category} • {tx.date}
        </p>
      </div>
      <div className="transaction-actions">
        <span className={`amount ${tx.amount >= 0 ? "income" : "expense"}`}>
          {tx.amount >= 0 ? "+" : "-"}₹{Math.abs(tx.amount).toFixed(2)}
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(tx)}
          aria-label="Edit transaction"
        >
          <i className="bi bi-pencil"></i>
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(tx.id)}
          ariaLabel="Delete transaction"
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </li>
  );
});

const TransactionList = React.memo(({ transactions, onDelete, onEdit }) => {
  return (
    <section className="transaction-section">
      <h2>Recent Transactions ({transactions.length})</h2>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found.</p>
        </div>
      ) : (
        <ul className="transaction-list">
          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              tx={tx}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </section>
  );
});

export default TransactionList;
