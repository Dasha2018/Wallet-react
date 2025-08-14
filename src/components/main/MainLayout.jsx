import PropTypes from "prop-types";
import ExpensesTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import * as S from "./mainPage.styled";

const MainLayout = ({
  sortedExpenses,
  newDescription,
  newCategory,
  newDate,
  newSum,
  editMode,
  categories,
  categoryIcons,
  categoryLabelsMap,
  errors,
  descriptionError,
  dateError,
  sumError,
  handleAddExpense,
  handleDescriptionChange,
  handleDateChange,
  handleSumChange,
  setNewCategory,
  selectedCategory,
  sortOrder,
  isCategoryDropdownOpen,
  isSortDropdownOpen,
  toggleCategoryDropdown,
  toggleSortDropdown,
  handleCategorySelect,
  handleSortSelect,
  sortOptions,
  onDeleteExpense,
}) => (
  <S.MainBlock>
    <S.H2>Мои расходы</S.H2>
    <S.ContentContainer>
      <S.ExpensesTableContainer>
        <S.TableHeader>
          <S.H3>Таблица расходов</S.H3>
          <S.FiltersRow>
            <S.FilterWrapper>
              <S.FilterButton onClick={toggleCategoryDropdown}>
                Фильтровать по категории{" "}
                <S.GreenLink>
                  {selectedCategory
                    ? categoryLabelsMap[selectedCategory]
                    : "выбрать"}
                </S.GreenLink>
                <S.DropdownArrow
                  $isOpen={isCategoryDropdownOpen}
                  src="/ArrowIcon.svg"
                  alt="Arrow Icon"
                />
              </S.FilterButton>
              {isCategoryDropdownOpen && (
                <S.DropdownMenu>
                  {categories.map((category) => (
                    <S.DropdownItem
                      key={category.key}
                      onClick={() => handleCategorySelect(category.key)}
                      className={
                        selectedCategory === category.key ? "selected" : ""
                      }
                    >
                      {category.label}
                    </S.DropdownItem>
                  ))}
                </S.DropdownMenu>
              )}
            </S.FilterWrapper>
            <S.FilterWrapper>
              <S.FilterButton onClick={toggleSortDropdown}>
                Сортировать по{" "}
                <S.GreenLink>
                  {sortOrder === "date" ? "дате" : "сумме"}
                </S.GreenLink>
                <S.DropdownArrow
                  $isOpen={isSortDropdownOpen}
                  src="/ArrowIcon.svg"
                  alt="Arrow Icon"
                />
              </S.FilterButton>
              {isSortDropdownOpen && (
                <S.DropdownMenu>
                  {sortOptions.map((option) => (
                    <S.DropdownItem
                      key={option}
                      onClick={() => handleSortSelect(option)}
                    >
                      {option === "date" ? "По дате" : "По сумме"}
                    </S.DropdownItem>
                  ))}
                </S.DropdownMenu>
              )}
            </S.FilterWrapper>
          </S.FiltersRow>
        </S.TableHeader>
        <ExpensesTable
          expenses={sortedExpenses}
          onDelete={onDeleteExpense}
          categoryLabelsMap={categoryLabelsMap}
        />
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

MainLayout.propTypes = {
  sortedExpenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      sum: PropTypes.number.isRequired,
    })
  ).isRequired,
  newDescription: PropTypes.string.isRequired,
  newCategory: PropTypes.string.isRequired,
  newDate: PropTypes.string.isRequired,
  newSum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  editMode: PropTypes.bool.isRequired,
  editingTransactionId: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryIcons: PropTypes.objectOf(PropTypes.node).isRequired,
  errors: PropTypes.object.isRequired,
  descriptionError: PropTypes.bool.isRequired,
  dateError: PropTypes.bool.isRequired,
  sumError: PropTypes.bool.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleSumChange: PropTypes.func.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  categoryLabelsMap: PropTypes.objectOf(PropTypes.string).isRequired,
  setNewCategory: PropTypes.func.isRequired,

  selectedCategory: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  isCategoryDropdownOpen: PropTypes.bool.isRequired,
  isSortDropdownOpen: PropTypes.bool.isRequired,
  toggleCategoryDropdown: PropTypes.func.isRequired,
  toggleSortDropdown: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainLayout;
