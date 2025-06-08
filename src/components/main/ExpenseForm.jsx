import PropTypes from "prop-types";
import * as S from "./mainPage.styled";

const ExpenseForm = ({
  newDescription,
  newCategory,
  setNewCategory,
  newDate,
  newAmount,
  handleAddExpense,
  editMode,
  categories,
  categoryIcons,
  errors,
  descriptionError,
  dateError,
  amountError,
  handleDescriptionChange,
  handleDateChange,
  handleAmountChange,
}) => (
  <S.NewExpenseContainer>
    <S.NewExpenseTitle>
      {editMode ? "Редактирование" : "Новый расход"}
    </S.NewExpenseTitle>
    <S.InputLabel htmlFor="description">
      {(errors.description || descriptionError) && <S.ErrorStar>*</S.ErrorStar>}{" "}
      Описание:
    </S.InputLabel>
    <S.InputField
      type="text"
      id="description"
      placeholder="Введите описание"
      value={newDescription}
      onChange={handleDescriptionChange}
    />
    <S.InputLabel>
      {errors.category && <S.ErrorStar>*</S.ErrorStar>} Категория:
    </S.InputLabel>
    <S.CategoryButtonsContainer>
      {categories.map((category) => (
        <S.CategoryButton
          key={category}
          onClick={() => setNewCategory(category)}
          className={newCategory === category ? "selected" : ""}
        >
          {categoryIcons[category]}
          {category}
        </S.CategoryButton>
      ))}
    </S.CategoryButtonsContainer>
    <S.InputLabel htmlFor="date">
      {(errors.date || dateError) && <S.ErrorStar>*</S.ErrorStar>} Дата:
    </S.InputLabel>
    <S.InputField
      id="date"
      placeholder="дд.мм.гггг"
      value={newDate}
      onChange={handleDateChange}
    />
    <S.InputLabel htmlFor="amount">
      {(errors.amount || amountError) && <S.ErrorStar>*</S.ErrorStar>} Сумма:
    </S.InputLabel>
    <S.InputField
      id="amount"
      placeholder="Введите сумму"
      value={newAmount}
      onChange={handleAmountChange}
    />
    <S.AddExpenseButton onClick={handleAddExpense}>
      {editMode ? "Сохранить редактирование" : "Добавить новый расход"}
    </S.AddExpenseButton>
  </S.NewExpenseContainer>
);

ExpenseForm.propTypes = {
  newDescription: PropTypes.string.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  newDate: PropTypes.string.isRequired,
  newAmount: PropTypes.string.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryIcons: PropTypes.objectOf(PropTypes.node).isRequired,
  errors: PropTypes.object.isRequired,
  descriptionError: PropTypes.bool.isRequired,
  dateError: PropTypes.bool.isRequired,
  amountError: PropTypes.bool.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAmountChange: PropTypes.func.isRequired,
};

export default ExpenseForm;
