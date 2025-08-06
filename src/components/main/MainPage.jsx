import { useState, useContext } from "react";
import FoodIcon from "../foodIcon/FoodIcon";
import MainLayout from "./MainLayout";
import { useExpenseForm } from "../../hooks/useExpenseForm";
import * as S from "./mainPage.styled";
import { deleteTransaction } from "../../services/api";
import { getToken } from "../../services/auth";
import ExpenseContext from "../../ExpenseContext";

function MainPage() {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const filteredAndSortedExpenses = expenses
    .filter((expense) =>
      selectedCategory ? expense.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "sum") {
        return b.sum - a.sum;
      }
      return 0;
    });

  const handleDeleteExpense = async (id) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Нет токена авторизации");

      const updatedTransactions = await deleteTransaction(token, id);
      setExpenses(updatedTransactions.transactions || updatedTransactions);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const {
    newDescription,
    newCategory,
    newDate,
    newSum,
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
    setNewCategory,
  } = useExpenseForm(expenses, setExpenses);

  const categories = [
    { label: "Еда", key: "food" },
    { label: "Транспорт", key: "transport" },
    { label: "Жильё", key: "housing" },
    { label: "Развлечения", key: "joy" },
    { label: "Образование", key: "education" },
    { label: "Прочее", key: "others" },
  ];

  const categoryIcons = {
    food: <FoodIcon />,
    transport: <S.CategoryIcon src="/car (1).svg" alt="Transport icon" />,
    housing: <S.CategoryIcon src="/HouseIcon.svg" alt="Housing icon" />,
    joy: <S.CategoryIcon src="/PlayIcon.svg" alt="Entertainment icon" />,
    education: <S.CategoryIcon src="/StudyIcon.svg" alt="Education icon" />,
    others: <S.CategoryIcon src="/OtherIcon.svg" alt="Other icon" />,
  };
  const sortOptions = ["date", "sum"];

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsSortDropdownOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    setIsCategoryDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleSortSelect = (order) => {
    setSortOrder(order);
    setIsSortDropdownOpen(false);
  };

  return (
    <MainLayout
      sortedExpenses={filteredAndSortedExpenses}
      newDescription={newDescription}
      newCategory={newCategory}
      newDate={newDate}
      newSum={newSum}
      editMode={editMode}
      editingTransactionId={editingTransactionId}
      categories={categories}
      categoryIcons={categoryIcons}
      errors={errors}
      descriptionError={descriptionError}
      dateError={dateError}
      sumError={sumError}
      handleEditExpense={handleEditExpense}
      handleAddExpense={handleAddExpense}
      handleDescriptionChange={handleDescriptionChange}
      handleDateChange={handleDateChange}
      handleSumChange={handleSumChange}
      setNewCategory={setNewCategory}
      selectedCategory={selectedCategory}
      sortOrder={sortOrder}
      isCategoryDropdownOpen={isCategoryDropdownOpen}
      isSortDropdownOpen={isSortDropdownOpen}
      toggleCategoryDropdown={toggleCategoryDropdown}
      toggleSortDropdown={toggleSortDropdown}
      handleCategorySelect={handleCategorySelect}
      handleSortSelect={handleSortSelect}
      sortOptions={sortOptions}
      onDeleteExpense={handleDeleteExpense}
    />
  );
}

export default MainPage;
