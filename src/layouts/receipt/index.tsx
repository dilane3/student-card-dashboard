import { useContext } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ExportContext } from "@/context/export";
import { PrinterIcon } from "@heroicons/react/24/solid";

import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
import ReceiptDocument from "./receiptDocument";

type ReceiptProps = {
  receiptRef?: React.MutableRefObject<null>;
  qrcode?: string | undefined;
};

function Receipt({ receiptRef }: ReceiptProps) {
  // Context
  const exportContext = useContext(ExportContext);

  // Global state
  const { cards } = useSignal<StudentCardState>("students");

  return (
    <>
      {cards.length > 0 && (
        <div className="w-full">
          <Button
            className="bg-primary hover:bg-primary/80 flex items-center"
            onClick={exportContext?.print}
          >
            <PrinterIcon strokeWidth={2} className="h-6 w-6 mr-2" />
            <Typography className="font-nunitoBold">Export</Typography>
          </Button>

          {/* This will contain all the logic */}
          <div
            ref={exportContext?.exportRef}
            className="w-full flex flex-col items-center"
          >
            <ReceiptDocument cards={cards} />
          </div>
        </div>
      )}
    </>
  );
}

export default Receipt;
