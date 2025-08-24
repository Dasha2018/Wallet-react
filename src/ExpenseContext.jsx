import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTransactions } from "./services/api";
import { getToken } from "./services/auth";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const data = await fetchTransactions({ token });
        const rawExpenses = data.transactions || data;

        const normalizedExpenses = rawExpenses.map((item) => {
          const isoDate = item.date || item.createdAt;

          return {
            id: item.id || item._id || String(Math.random()),
            description: item.description || item.title || "Без описания",
            category: item.category || "others",
            date: isoDate,
            amount: String(item.amount ?? 0),
          };
        });

        setExpenses(normalizedExpenses);
      } catch (error) {
        console.error("Ошибка загрузки транзакций", error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, loading }}>
      {children}
    </ExpenseContext.Provider>
  );
}

ExpenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExpenseContext;
