/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([
    {
      description: "Пятёрочка",
      category: "Еда",
      date: "03.07.2024",
      amount: "3 500 ₽",
    },
    {
      description: "Метро",
      category: "Транспорт",
      date: "02.07.2024",
      amount: "200 ₽",
    },
    {
      description: "Квартплата",
      category: "Жильё",
      date: "01.07.2024",
      amount: "5 000 ₽",
    },
  ]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}

ExpenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error(
      "useExpenses must be used within an ExpenseContext.Provider"
    );
  }
  return context;
}
