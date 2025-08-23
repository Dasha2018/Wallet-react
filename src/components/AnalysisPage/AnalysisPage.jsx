import * as S from "./AnalysisPage.styled";
import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getMonth,
  getDay,
} from "date-fns";
import { ru } from "date-fns/locale/ru";
import ChartComponent from "./Diagram";
import { fetchTransactionsByPeriod } from "../../services/api";
import { getToken } from "../../services/auth";

function AnalysisPage() {
  const [currentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(
    startOfMonth(currentDate)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    endOfMonth(currentDate)
  );
  const [selectedPeriod, setSelectedPeriod] = useState("Месяц");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadExpenses = async (start, end) => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const data = await fetchTransactionsByPeriod(token, start, end);
        const normalizedExpenses = data.map((item) => ({
          description: item.description,
          category: item.category,
          date: item.date,
          amount: String(item.amount),
        }));
        setExpenses(normalizedExpenses);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных за период:", error);
      setExpenses([]); 
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  if (selectedStartDate && selectedEndDate) {
    loadExpenses(selectedStartDate, selectedEndDate);
  }
}, [selectedStartDate, selectedEndDate]);


  const handleDayClick = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day);

      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (day < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);

        setSelectedStartDate(day);
      } else {
        setSelectedEndDate(day);
      }
    }
  };

  const handleMonthClick = (month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };


  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const today = new Date();
    if (period === "Месяц") {
      setSelectedStartDate(startOfMonth(today));
      setSelectedEndDate(endOfMonth(today));
    } else if (period === "Год") {
      setSelectedStartDate(startOfYear(today));
      setSelectedEndDate(endOfYear(today));
    }
  };

  const getPeriodRange = () => {
    if (selectedStartDate && selectedEndDate) {
      return { start: selectedStartDate, end: selectedEndDate };
    }
    return { start: startOfMonth(currentDate), end: endOfMonth(currentDate) };
  };

  const periodRange = getPeriodRange();

  const daysOfYear = eachDayOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate),
  });

  const startYear = 2000;
  const endYear = 2050;
  const yearMonthList = [];
  for (let year = startYear; year <= endYear; year++) {
    const yearDate = new Date(year, 0, 1);
    yearMonthList.push({ type: "yearHeader", year });
    const months = eachMonthOfInterval({
      start: yearDate,
      end: endOfYear(yearDate),
    });
    yearMonthList.push({ type: "monthGrid", months, year });
  }

  const isSelectedDay = (day) => {
    if (!selectedStartDate || !selectedEndDate)
      return isSameDay(day, selectedStartDate);
    return day >= selectedStartDate && day <= selectedEndDate;
  };

  const isSelectedMonth = (month) => {
    if (!selectedStartDate || !selectedEndDate)
      return isSameDay(month, selectedStartDate);
    const start = startOfMonth(selectedStartDate);
    const end = endOfMonth(selectedEndDate);
    const currentMonthStart = startOfMonth(month);
    return currentMonthStart >= start && currentMonthStart <= end;
  };

  const isCurrentDay = (day) => {
    return isToday(day);
  };

  const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const totalAmount = expenses.reduce(
    (sum, expense) =>
      sum + parseFloat(expense.amount.replace(" ₽", "").replace(" ", "")),
    0
  );

  let currentMonth = null;
  const calendarDays = [];
  daysOfYear.forEach((day) => {
    const dayMonth = getMonth(day);
    if (currentMonth !== dayMonth) {
      currentMonth = dayMonth;
      calendarDays.push({
        type: "monthHeader",
        month: format(day, "MMMM", { locale: ru }),
      });
      const firstDayOfMonth = getDay(startOfMonth(day));
      const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
      for (let i = 0; i < offset; i++) {
        calendarDays.push({ type: "placeholder" });
      }
    }
    calendarDays.push({
      type: "day",
      day,
    });
  });

  return (
    <S.MainBlock>
      <S.H2>Анализ расходов</S.H2>
      <S.ContentContainer>
        <S.NewExpenseContainer>
          <S.NewExpenseTitle>
            Период
            <S.PeriodElements>
              {["Месяц", "Год"].map((period) => (
                <S.PeriodElement
                  key={period}
                  $active={selectedPeriod === period}
                  onClick={() => handlePeriodChange(period)}
                >
                  {period}
                </S.PeriodElement>
              ))}
            </S.PeriodElements>
          </S.NewExpenseTitle>

          <S.CalendarContainer>
            {selectedPeriod === "Месяц" && (
              <>
                <S.DaysOfWeek>
                  {dayNames.map((dayName, index) => (
                    <S.DayOfWeek key={index}>{dayName}</S.DayOfWeek>
                  ))}
                </S.DaysOfWeek>
                <S.CalendarGrid>
                  {calendarDays.map((item, index) => {
                    if (item.type === "monthHeader") {
                      return (
                        <S.MonthHeader key={`month-${index}`}>
                          {item.month}
                        </S.MonthHeader>
                      );
                    } else if (item.type === "placeholder") {
                      return <S.Placeholder key={`placeholder-${index}`} />;
                    } else {
                      const day = item.day;
                      return (
                        <S.Day
                          key={day.toISOString()}
                          onClick={() => handleDayClick(day)}
                          $selected={isSelectedDay(day)}
                          $today={isCurrentDay(day)}
                        >
                          {format(day, "d")}
                        </S.Day>
                      );
                    }
                  })}
                </S.CalendarGrid>
              </>
            )}
            {selectedPeriod === "Год" && (
              <S.MonthList>
                {yearMonthList.map((item) => {
                  if (item.type === "yearHeader") {
                    return (
                      <S.YearHeader key={`year-${item.year}`}>
                        {item.year}
                      </S.YearHeader>
                    );
                  } else {
                    const months = item.months;
                    const year = item.year;
                    return (
                      <S.MonthGrid key={`month-grid-${year}`}>
                        {months.map((month) => (
                          <S.Month
                            key={month.toISOString()}
                            onClick={() => handleMonthClick(month)}
                            $selected={isSelectedMonth(month)}
                          >
                            {format(month, "MMMM", { locale: ru })}
                          </S.Month>
                        ))}
                      </S.MonthGrid>
                    );
                  }
                })}
              </S.MonthList>
            )}
          </S.CalendarContainer>
        </S.NewExpenseContainer>
        <S.ExpensesTableContainer>
          <S.TableHeader>
            <S.H3>{totalAmount.toFixed(0)} ₽</S.H3>
            <S.FiltersContainer>
              Расходы за{" "}
              {format(periodRange.start, "dd MMMM yyyy", { locale: ru })} –{" "}
              {format(periodRange.end, "dd MMMM yyyy", { locale: ru })}
            </S.FiltersContainer>
          </S.TableHeader>
          {loading ? (
            <div>Загрузка данных...</div>
          ) : expenses.length > 0 ? (
            <ChartComponent expenses={expenses} />
          ) : (
            <div>Нет данных для отображения за выбранный период.</div>
          )}
        </S.ExpensesTableContainer>
      </S.ContentContainer>
    </S.MainBlock>
  );
}

export default AnalysisPage;
