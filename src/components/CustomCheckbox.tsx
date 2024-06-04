import { cn } from "@/utils";
import React, { useMemo, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange: (value: boolean | undefined) => void;
}

type Checked = {
  checkedBox: boolean | "indeterminate";
};

const CustomCheckbox = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type"> & Checked
>(({ onCheckedChange, checkedBox, className, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(
    checkedBox === "indeterminate" ? false : checkedBox,
  );

  const finallySelected = useMemo(
    () => (checkedBox === "indeterminate" ? isChecked : checkedBox),
    [isChecked, checkedBox],
  );

  return (
    <input
      type={"checkbox"}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      checked={finallySelected}
      onChange={(e) => {
        setIsChecked(!isChecked);
        onCheckedChange(e.target.checked);
      }}
      {...props}
    />
  );
});

export default CustomCheckbox;
