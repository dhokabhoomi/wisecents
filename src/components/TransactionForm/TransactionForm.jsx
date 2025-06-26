import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import "./TransactionForm.css";

const TransactionForm = React.memo(({ onSubmit, editTx }) => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    type: "expense",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTx) {
      setForm({
        ...editTx,
        amount: Math.abs(editTx.amount).toString(),
        type: editTx.amount < 0 ? "expense" : "income",
      });
    } else {
      setForm({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().slice(0, 10),
        type: "expense",
      });
    }
  }, [editTx]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "Required";
    if (!form.amount || form.amount <= 0) newErrors.amount = "Invalid amount";
    if (!form.category) newErrors.category = "Required";
    if (!form.date) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      id: editTx?.id || Date.now(),
      amount: parseFloat(form.amount) * (form.type === "expense" ? -1 : 1),
    });
  };

  return (
    <section className="transaction-form-modal">
      <h2 className="form-title">
        {editTx ? "Edit Transaction" : "Add Transaction"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Coffee"
            className={errors.description ? "error" : ""}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && (
              <span className="error-message">{errors.amount}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={errors.date ? "error" : ""}
            />
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type</label>

            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={errors.category ? "error" : ""}
            >
              <option value="">Select</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="utilities">Utilities</option>
              <option value="salary">Salary</option>
              <option value="rent">Rent</option>
              <option value="entertainment">Entertainment</option>
              <option value="healthcare">Healthcare</option>
              <option value="others">Others</option>
            </select>
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" fullWidth variant="primary" size="lg">
            {editTx ? "Update" : "Add Transaction"}
          </Button>
        </div>
      </form>
    </section>
  );
});
export default TransactionForm;
