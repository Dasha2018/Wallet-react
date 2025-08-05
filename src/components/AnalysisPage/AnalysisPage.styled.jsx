import styled from "styled-components";

export const MainBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    background: #ffffff;
  }
  background: #f4f5f6;
  min-height: 100vh;
`;

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  letter-spacing: 0px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    margin-bottom: -64px;
  }
`;

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 36px;
  flex-direction: row;
`;

export const ExpensesTableContainer = styled.div`
  width: 789px;
  border-radius: 30px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  height: 540px;
`;

export const NewExpenseContainer = styled.div`
  width: 379px;
  border-radius: 30px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
  height: 540px;
  margin-right: 32px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NewExpenseTitle = styled.h3`
  margin-bottom: 26px;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PeriodElements = styled.div`
  display: flex;
  gap: 8px;
`;

export const PeriodElement = styled.button`
  border: none;
  background: none;
  font-size: 12px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#7334EA" : "#000")};
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};

  &:hover {
    color: #7334EA;
    font-weight: 600;
    text-decoration: none;
  }
`;

export const CalendarContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const CalendarTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
`;

export const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 12px;
  color: #999999;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

export const DayOfWeek = styled.div`
  flex: 1;
  text-align: center;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  flex-grow: 1;
  height: 472px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  -webkit-overflow-scrolling: auto;
  overflow-y: overlay;
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
  &::-webkit-scrollbar {
    width: 6px !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9 !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-button {
    display: none !important;
  }
`;

export const Day = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;

  background: ${({ $selected }) => ($selected ? "#C0B2F9" : "#F4F5F6")};
  color: ${({ $today }) => ($today ? "#7334EA" : "#000")};

  &:hover {
    background: #C0B2F9;
    color: #7334EA;
  }
`;

export const MonthHeader = styled.div`
  grid-column: 1 / -1;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  padding: 10px 0;
  color: #000;
`;

export const Placeholder = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  height: 504px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  -webkit-overflow-scrolling: auto;
  overflow-y: overlay;
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
  &::-webkit-scrollbar {
    width: 6px !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9 !important;
    border-radius: 30px !important;
  }
  &::-webkit-scrollbar-button {
    display: none !important;
  }
`;

export const YearHeader = styled.div`
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  padding: 10px 0;
  color: #000;
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const Month = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 30px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;

  background: ${({ $selected }) => ($selected ? "##C0B2F9" : "#F4F5F6")};
  color: ${({ $today }) => ($today ? "#7334EA" : "#000")};

  &:hover {
    background: #C0B2F9;
    color: #7334EA;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const H3 = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
`;

export const TableHead = styled.thead`
  color: #999999;
  border-bottom: 1px solid #ddd;
`;

export const TableHeaderCell = styled.th`
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: left;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;

  &:first-child {
    padding-left: 32px;
  }

  &:last-child {
    padding-right: 108px;
  }

  &:nth-child(2) {
    padding-right: 30px;
  }
  &:nth-child(3) {
    width: 170px;
  }
`;

export const TableRow = styled.tr`
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
`;

export const TableCell = styled.td`
  padding-top: 20px;

  &:first-child {
    padding-left: 32px;
    padding-right: 10px;
  }

  &:last-child {
    padding-right: 12px;
  }

  &:nth-child(3) {
    width: 170px;
  }

  &:nth-child(5) {
    width: 12px;
    padding-left: 82px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 22px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;

  &:focus {
    border-color: #7334EA;
    outline: none;
  }
`;

export const CategoryButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 30px;
  padding-top: 8px;
  padding-right: 20px;
  padding-bottom: 8px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background-color: #ddd;
  }
`;

export const FiltersContainer = styled.div`
  font-size: 12px;
  color: #999999;
`;
