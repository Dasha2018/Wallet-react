import { useState } from "react";
import FoodIcon from "../foodIcon/FoodIcon";
import { useExpenses } from "../../ExpenseContext";
import MainLayout from "./MainLayout";
import { useExpenseForm } from "../../hooks/useExpenseForm";
import * as S from "./mainPage.styled";

function MainPage() {
  const { expenses = [], setExpenses } = useExpenses() || {};
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("Дата");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const {
    newDescription,
    setNewDescription,
    newCategory,
    setNewCategory,
    newDate,
    setNewDate,
    newAmount,
    setNewAmount,
    errors,
    descriptionError,
    dateError,
    amountError,
    editMode,
    editingExpenseIndex,
    handleDescriptionChange,
    handleDateChange,
    handleAmountChange,
    handleEditExpense,
    handleAddExpense,
  } = useExpenseForm(expenses, setExpenses);

  const categories = [
    "Еда",
    "Транспорт",
    "Жильё",
    "Развлечения",
    "Образование",
    "Другое",
  ];
  const categoryIcons = {
    Еда: <FoodIcon />,
    Транспорт: <S.CategoryIcon src="/car (1).svg" alt="Transport icon" />,
    Жильё: <S.CategoryIcon src="/HouseIcon.svg" alt="Housing icon" />,
    Развлечения: (
      <S.CategoryIcon src="/PlayIcon.svg" alt="Entertainment icon" />
    ),
    Образование: <S.CategoryIcon src="/StudyIcon.svg" alt="Education icon" />,
    Другое: <S.CategoryIcon src="/OtherIcon.svg" alt="Other icon" />,
  };
  const sortOptions = ["Дата", "Сумма"];

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

  const filteredExpenses = filterExpenses(expenses, selectedCategory);
  const sortedExpenses = sortExpenses(filteredExpenses, sortOrder);

  function filterExpenses(expenses, selectedCategory) {
    return selectedCategory
      ? (expenses || []).filter(
          (expense) => expense?.category === selectedCategory
        )
      : expenses || [];
  }

  function sortExpenses(expenses, sortOrder) {
    return [...(expenses || [])].sort((a, b) => {
      if (sortOrder === "Дата") {
        const dateA = a?.date
          ? new Date(a.date.split(".").reverse().join("-"))
          : new Date();
        const dateB = b?.date
          ? new Date(b.date.split(".").reverse().join("-"))
          : new Date();
        return dateB - dateA;
      } else {
        const amountA = a?.amount
          ? parseFloat(a.amount.replace(" ₽", "").replace(" ", ""))
          : 0;
        const amountB = b?.amount
          ? parseFloat(b.amount.replace(" ₽", "").replace(" ", ""))
          : 0;
        return amountB - amountA;
      }
    });
  }

  return (
    <MainLayout
      sortedExpenses={sortedExpenses}
      newDescription={newDescription}
      newCategory={newCategory}
      newDate={newDate}
      newAmount={newAmount}
      editMode={editMode}
      editingExpenseIndex={editingExpenseIndex}
      categories={categories}
      categoryIcons={categoryIcons}
      errors={errors}
      descriptionError={descriptionError}
      dateError={dateError}
      amountError={amountError}
      handleEditExpense={handleEditExpense}
      handleAddExpense={handleAddExpense}
      handleDescriptionChange={handleDescriptionChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      setNewDescription={setNewDescription}
      setNewCategory={setNewCategory}
      setNewDate={setNewDate}
      setNewAmount={setNewAmount}
      selectedCategory={selectedCategory}
      sortOrder={sortOrder}
      isCategoryDropdownOpen={isCategoryDropdownOpen}
      isSortDropdownOpen={isSortDropdownOpen}
      toggleCategoryDropdown={toggleCategoryDropdown}
      toggleSortDropdown={toggleSortDropdown}
      handleCategorySelect={handleCategorySelect}
      handleSortSelect={handleSortSelect}
      sortOptions={sortOptions}
    />
  );
}

export default MainPage;
