import { useState, useContext, useEffect } from "react";
import FoodIcon from "../foodIcon/FoodIcon";
import MainLayout from "./MainLayout";
import { useExpenseForm } from "../../hooks/useExpenseForm";
import * as S from "./mainPage.styled";
import { deleteTransaction, fetchTransactions } from "../../services/api";
import { getToken } from "../../services/auth";
import ExpenseContext from "../../ExpenseContext";

function MainPage() {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("date");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      setIsLoading(true);
      console.log("Начало загрузки транзакций...");
      try {
        const token = getToken();
        if (!token) {
          console.warn("Нет токена, транзакции не загружены.");
          setIsLoading(false);
          setIsLoaded(true);
          return;
        }

        const data = await fetchTransactions({ token });
        console.log("Транзакции успешно загружены:", data);
        setExpenses(data);
      } catch (error) {
        console.error("Не удалось загрузить транзакции:", error);
      } finally {
        console.log("Загрузка завершена.");
        setIsLoading(false);
        setIsLoaded(true);
      }
    };
    loadExpenses();
  }, [setExpenses]);

  const filteredAndSortedExpenses =
    Array.isArray(expenses) && expenses.length > 0
      ? expenses
          .filter((expense) =>
            selectedCategories.length > 0
              ? selectedCategories.includes(expense.category)
              : true
          )
          .sort((a, b) => {
            if (sortOrder === "date") {
              return new Date(b.date) - new Date(a.date);
            } else if (sortOrder === "sum") {
              return b.sum - a.sum;
            }
            return 0;
          })
      : [];

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

  const categoryLabelsMap = categories.reduce((map, category) => {
    map[category.key] = category.label;
    return map;
  }, {});

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
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSortOrder("date");
  };

  const handleSortSelect = (order) => {
    setSortOrder(order);
    setIsSortDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <S.MainBlock>
        <S.H2>Мои расходы</S.H2>
        <S.ContentContainer>
          <S.ExpensesTableContainer>
            <div>Загрузка транзакций...</div>
          </S.ExpensesTableContainer>
        </S.ContentContainer>
      </S.MainBlock>
    );
  }

  if (isLoaded && expenses.length === 0) {
    return (
      <S.MainBlock>
        <S.H2>Мои расходы</S.H2>
        <S.ContentContainer>
          <S.ExpensesTableContainer>
            <div>
              Нет данных для отображения. Добавьте свои первые транзакции.
            </div>
          </S.ExpensesTableContainer>
          <ExpenseForm
            newDescription={newDescription}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            newDate={newDate}
            newSum={newSum}
            handleAddExpense={handleAddExpense}
            editMode={editMode}
            categories={categories}
            categoryIcons={categoryIcons}
            errors={errors}
            descriptionError={descriptionError}
            dateError={dateError}
            sumError={sumError}
            handleDescriptionChange={handleDescriptionChange}
            handleDateChange={handleDateChange}
            handleSumChange={handleSumChange}
          />
        </S.ContentContainer>
      </S.MainBlock>
    );
  }

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
      categoryLabelsMap={categoryLabelsMap}
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
      selectedCategories={selectedCategories}
      sortOrder={sortOrder}
      isCategoryDropdownOpen={isCategoryDropdownOpen}
      isSortDropdownOpen={isSortDropdownOpen}
      toggleCategoryDropdown={toggleCategoryDropdown}
      toggleSortDropdown={toggleSortDropdown}
      handleCategorySelect={handleCategorySelect}
      handleSortSelect={handleSortSelect}
      handleClearFilters={handleClearFilters}
      sortOptions={sortOptions}
      onDeleteExpense={handleDeleteExpense}
    />
  );
}

export default MainPage;
