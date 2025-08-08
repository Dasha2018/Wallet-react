import PropTypes from "prop-types";
import * as S from "./mainPage.styled";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const ExpensesTable = ({ expenses, onDelete, categoryLabelsMap }) => (
  <S.Table>
    <S.TableHead>
      <S.TableRow>
        <S.TableHeaderCell>Описание</S.TableHeaderCell>
        <S.TableHeaderCell>Категория</S.TableHeaderCell>
        <S.TableHeaderCell>Дата</S.TableHeaderCell>
        <S.TableHeaderCell>Сумма</S.TableHeaderCell>
        <S.TableHeaderCell></S.TableHeaderCell>
      </S.TableRow>
    </S.TableHead>
    <tbody>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <S.TableRow key={expense._id ?? index}>
            <S.TableCell>{expense.description}</S.TableCell>
            <S.TableCell>
              {categoryLabelsMap[expense.category] || expense.category}
            </S.TableCell>
            <S.TableCell>{formatDate(expense.date)}</S.TableCell>
            <S.TableCell>{expense.sum}</S.TableCell>
            <S.TableCell>
              <S.DeleteButton onClick={() => onDelete(expense._id)}>
                <S.DeleteIcon src="DelBtn.svg" alt="Delete icon" />
              </S.DeleteButton>
            </S.TableCell>
          </S.TableRow>
        ))
      ) : (
        <S.TableRow>
          <S.TableCell colSpan="5">Нет данных для отображения</S.TableCell>
        </S.TableRow>
      )}
    </tbody>
  </S.Table>
);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      sum: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  categoryLabelsMap: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ExpensesTable;
