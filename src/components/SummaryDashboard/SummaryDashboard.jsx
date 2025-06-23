function SummaryDashboard({ transactions }) {
  const income = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income + expenses;

  return (
    <div className="card p-3 mb-3">
      <h5>Summary</h5>
      <div className="d-flex justify-content-around">
        <div>
          <strong>Total Income:</strong>{" "}
          <div className="text-success">
            <i class="bi bi-currency-rupee"></i>
            {income.toFixed(2)}
          </div>
        </div>
        <div>
          <strong>Total Expenses:</strong>
          <div className="text-danger">
            <i class="bi bi-currency-rupee"></i> {expenses.toFixed(2)}
          </div>
        </div>
        <div>
          <strong>Net Balance:</strong>
          <div className={balance >= 0 ? "text-success" : "text-danger"}>
            <i class="bi bi-currency-rupee"></i>
            {balance.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SummaryDashboard;
