export const isValidDateFormat = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const [year, month, day] = date.split("-").map(Number);
  const dateObject = new Date(year, month - 1, day);
  return (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() + 1 === month &&
    dateObject.getDate() === day
  );
};
export const isValidAmountFormat = (amount) => {
  const cleanedAmount = amount.replace(/\s/g, "");
  const amountRegex = /^\d+$/;
  return amountRegex.test(cleanedAmount);
};
