function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="card p-3 mb-3">
      <h5>Transaction List</h5>
      {transactions.length === 0 ? (
        <p>No Transactions yet!</p>
      ) : (
        <ul className="list-group">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <strong>{tx.description}</strong>
                <br />
                <i className="bi bi-currency-rupee"></i>
                {tx.amount.toFixed(2)} | {tx.category} | {tx.date}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => onEdit(tx)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  onClick={() => onDelete(tx.id)}
                  className="btn btn-sm btn-warning me-2"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TransactionList;
