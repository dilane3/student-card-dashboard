import { useState } from "react";

const useFilterByDate = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(`${new Date().getFullYear()}-01-01`),
  );
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now()));

  /**
   * Filter payments according to their rage dates
   */
  const handleSetRangeDate = (date: Date, name: "start_date" | "end_date") => {
    if (name === "start_date") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  /**
   * Reset the filters to their default value
   */
  const handleResetRangeDate = () => {
    setStartDate(new Date(`${new Date().getFullYear()}-01-01`));
    setEndDate(new Date(Date.now()));
  };

  return {
    handleResetRangeDate,
    handleSetRangeDate,
    endDate,
    startDate,
  };
};

export default useFilterByDate;
