import { useEffect, useState } from "react";

function TransactionContent({ onAdd, onUpdate, editTx }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    type: "expense",
  });

  useEffect(() => {
    if (editTx) {
      setForm({
        ...editTx,
        amount: Math.abs(editTx.amount),
        type: editTx.amount < 0 ? "expense" : "income",
      });
    }
  }, [editTx]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description || !form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      ...form,
      id: Date.now(),
      amount:
        form.type === "expense"
          ? -Math.abs(parseFloat(form.amount))
          : Math.abs(parseFloat(form.amount)),
    };

    if (editTx) {
      onUpdate(newTransaction);
    } else {
      onAdd(newTransaction);
    }

    setForm({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "expense",
    });
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Add transaction</h5>
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col">
            <input
              type="text"
              name="description"
              value={form.description}
              placeholder="Description"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <input
              type="number"
              name="amount"
              value={form.amount}
              placeholder="Amount"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <input
              type="date"
              name="date"
              value={form.date}
              placeholder="Category"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              value={form.type}
              className="form-control"
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <select
              name="category"
              value={form.category}
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary w-100" type="submit">
          {editTx ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
export default TransactionContent;
