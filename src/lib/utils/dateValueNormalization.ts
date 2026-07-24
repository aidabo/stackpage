import { format, isValid, parse, parseISO } from "date-fns";

const DATE_INPUT_FORMATS = [
  "yyyy-MM-dd",
  "yyyy/MM/dd",
  "MM/dd/yyyy",
  "dd/MM/yyyy",
  "yyyy年MM月dd日",
  "MMM dd, yyyy",
  "MMMM dd, yyyy",
];

export const normalizeDateInputValue = (dateValue: unknown): string => {
  if (!dateValue) return "";

  let date: Date;

  if (dateValue instanceof Date && isValid(dateValue)) {
    date = dateValue;
  } else if (typeof dateValue === "string") {
    date = parseISO(dateValue);

    if (!isValid(date)) {
      for (const formatString of DATE_INPUT_FORMATS) {
        date = parse(dateValue, formatString, new Date());
        if (isValid(date)) break;
      }
    }

    if (!isValid(date)) {
      date = new Date(dateValue);
    }
  } else if (typeof dateValue === "number") {
    date = new Date(dateValue);
  } else {
    return "";
  }

  return isValid(date) ? format(date, "yyyy-MM-dd") : "";
};
