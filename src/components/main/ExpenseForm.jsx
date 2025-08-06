import PropTypes from "prop-types";
import * as S from "./mainPage.styled";

const ExpenseForm = ({
  newDescription,
  newCategory,
  setNewCategory,
  newDate,
  newSum,
  handleAddExpense,
  editMode,
  categories,
  categoryIcons,
  errors,
  descriptionError,
  dateError,
  sumError,
  handleDescriptionChange,
  handleDateChange,
  handleSumChange,
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
      $hasError={!!(errors.description || descriptionError)}
    />

    <S.InputLabel>
      {errors.category && <S.ErrorStar>*</S.ErrorStar>} Категория:
    </S.InputLabel>
    <S.CategoryButtonsContainer>
      {categories.map(({ label, key }) => (
        <S.CategoryButton
          key={key}
          onClick={() => setNewCategory(key)}
          className={newCategory === key ? "selected" : ""}
        >
          {categoryIcons[key]} {label}
        </S.CategoryButton>
      ))}
    </S.CategoryButtonsContainer>

    <S.InputLabel htmlFor="date">
      {(errors.date || dateError) && <S.ErrorStar>*</S.ErrorStar>} Дата:
    </S.InputLabel>
    <S.InputField
      type="date"
      id="date"
      value={newDate}
      onChange={handleDateChange}
      $hasError={!!(errors.date || dateError)}
    />

    <S.InputLabel htmlFor="sum">
      {(errors.sum || sumError) && <S.ErrorStar>*</S.ErrorStar>} Сумма:
    </S.InputLabel>
    <S.InputField
      id="sum"
      placeholder="Введите сумму"
      value={newSum}
      onChange={handleSumChange}
      $hasError={!!(errors.sum || sumError)}
    />

    <S.AddExpenseButton onClick={handleAddExpense}>
      {editMode ? "Сохранить изменения" : "Добавить новый расход"}
    </S.AddExpenseButton>
  </S.NewExpenseContainer>
);

ExpenseForm.propTypes = {
  newDescription: PropTypes.string.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  newDate: PropTypes.string.isRequired,
  newSum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryIcons: PropTypes.objectOf(PropTypes.node).isRequired,
  errors: PropTypes.object.isRequired,
  descriptionError: PropTypes.bool.isRequired,
  dateError: PropTypes.bool.isRequired,
  sumError: PropTypes.bool.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleSumChange: PropTypes.func.isRequired,
};

export default ExpenseForm;
