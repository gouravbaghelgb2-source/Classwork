import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  // Form inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // Expenses data
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // useRef for input focus
  const titleInputRef = useRef(null);

  // useEffect - fetch data from mock API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        const data = await response.json();

        const formattedExpenses = data.map((item, index) => ({
          id: item.id,
          title: item.title.slice(0, 20),
          amount: [250, 500, 750, 1200, 450][index],
          category: ["Food", "Travel", "Shopping", "Bills", "Other"][index],
        }));

        setExpenses(formattedExpenses);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Add expense
  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please enter title and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    setTitle("");
    setAmount("");
    setCategory("Food");

    titleInputRef.current.focus();
  };

  // Delete expense
  const deleteExpense = useCallback((id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }, []);

  // useMemo - calculate total
  const totalExpense = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
        <p>Manage your daily expenses easily</p>
      </header>

      <main>
        {/* Summary */}
        <section className="summary">
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <h2>₹{totalExpense}</h2>
          </div>

          <div className="summary-card">
            <h3>Total Records</h3>
            <h2>{expenses.length}</h2>
          </div>
        </section>

        {/* Add Expense Form */}
        <section className="form-section">
          <h2>Add New Expense</h2>

          <form onSubmit={addExpense}>
            <input
              ref={titleInputRef}
              type="text"
              placeholder="Expense title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Other</option>
            </select>

            <button type="submit">Add Expense</button>
          </form>
        </section>

        {/* Expense List */}
        <section className="expense-section">
          <h2>Expense List</h2>

          {loading ? (
            <p className="loading">Loading expenses...</p>
          ) : expenses.length === 0 ? (
            <p className="empty">No expenses found.</p>
          ) : (
            <div className="expense-list">
              {expenses.map((expense) => (
                <div className="expense-card" key={expense.id}>
                  <div>
                    <h3>{expense.title}</h3>
                    <p>{expense.category}</p>
                  </div>

                  <div className="expense-right">
                    <strong>₹{expense.amount}</strong>

                    <button
                      className="delete-btn"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;