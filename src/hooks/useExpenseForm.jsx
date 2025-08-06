import { useState } from "react";
import {
  addTransaction,
  updateTransaction,
  fetchTransactions,
} from "../services/api";
import { getToken } from "../services/auth";

export const useExpenseForm = (expenses, setExpenses) => {
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newSum, setNewSum] = useState("");
  const [errors, setErrors] = useState({
    description: false,
    category: false,
    date: false,
    sum: false,
  });
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [sumError, setSumError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setNewDescription(value);
    setDescriptionError(value.length < 4);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setNewDate(value);
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
    setDateError(value.length > 0 && !isValid);
  };

  const handleSumChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setNewSum(value);
    const cleanedValue = value.replace(/\s/g, "");
    const isValid =
      cleanedValue.length > 0 &&
      !isNaN(Number(cleanedValue)) &&
      Number(cleanedValue) > 0;
    setSumError(!isValid);
  };

  const handleEditExpense = (id) => {
    const transaction = expenses.find((exp) => exp._id === id);
    if (!transaction) return;

    setNewDescription(transaction.description);
    setNewCategory(transaction.category);

    const date = new Date(transaction.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setNewDate(formattedDate);
    setNewSum(transaction.sum.toString());
    setEditMode(true);
    setEditingTransactionId(id);
    setErrors({
      description: false,
      category: false,
      date: false,
      sum: false,
    });
    setDescriptionError(false);
    setDateError(false);
    setSumError(false);
  };

  const handleAddExpense = async () => {
    const newErrors = {
      description: newDescription.length < 4,
      category: !newCategory,
      date: !newDate || !/^\d{4}-\d{2}-\d{2}$/.test(newDate),
      sum: !newSum || isNaN(Number(newSum)) || Number(newSum) <= 0,
    };
    setErrors(newErrors);
    setDescriptionError(newErrors.description);
    setDateError(newErrors.date);
    setSumError(newErrors.sum);

    if (Object.values(newErrors).some(Boolean)) return;

    const token = getToken();
    if (!token) {
      console.error(
        "Нет токена авторизации. Невозможно добавить/обновить транзакцию."
      );
      return;
    }

    /* const dateObject = new Date(newDate);
const formattedDate = `${dateObject.getFullYear()}-${String(dateObject.getMonth() + 1).padStart(2, "0")}-${String(dateObject.getDate()).padStart(2, "0")}`;
 */
    const transactionData = {
      description: newDescription,
      category: newCategory,
      date: newDate,
      sum: Number(newSum),
    };

    try {
      if (editMode) {
        await updateTransaction(token, editingTransactionId, transactionData);
      } else {
        await addTransaction(token, transactionData);
      }

      const updatedTransactionsList = await fetchTransactions({ token });
      setExpenses(updatedTransactionsList.transactions);

      setNewDescription("");
      setNewCategory("");
      setNewDate("");
      setNewSum("");
      setEditMode(false);
      setEditingTransactionId(null);
      setErrors({
        description: false,
        category: false,
        date: false,
        sum: false,
      });
      setDescriptionError(false);
      setDateError(false);
      setSumError(false);
    } catch (error) {
      console.error("Ошибка при сохранении транзакции:", error);
    }
  };

  return {
    newDescription,
    setNewDescription,
    newCategory,
    setNewCategory,
    newDate,
    setNewDate,
    newSum,
    setNewSum,
    errors,
    descriptionError,
    dateError,
    sumError,
    editMode,
    editingTransactionId,
    handleDescriptionChange,
    handleDateChange,
    handleSumChange,
    handleEditExpense,
    handleAddExpense,
  };
};
