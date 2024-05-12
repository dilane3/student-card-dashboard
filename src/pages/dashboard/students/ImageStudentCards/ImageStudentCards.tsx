import { ModalContext } from "@/context/modalContext";
import { useContext, useState } from "react";
import CardEntity, {
  CardStatusesType,
  cardsStatuses,
} from "@/entities/studentCard.entity";
import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
import { Option, Select, Switch } from "@material-tailwind/react";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";
import DataTable from "@/components/datatable/DataTable";
import { StudentsTableColumns } from "../students";

const ImageStudentCards = () => {
  const { handleOpen, dispatch } = useContext(ModalContext);

  const [exportEnabled, setExportEnabled] = useState(false);
  const [statusValue, setStatusValue] = useState<CardStatusesType | "ALL">("ALL");

  const { loading } = useLoadStudentsCards(statusValue);

  // Global state
  const { cards } = useSignal<StudentCardState>("students");

  /**
   * Function to view and export the card in image format
   */
  const handleOpenViewCardModel = (card: CardEntity) => {
    if (!dispatch) return;

    dispatch({ type: "VIEW_CARD", payload: card });
    handleOpen();
  };

  return (
    <>
      <div className="ml-6 flex flex-col md:flex-row items-start md:items-center">
        <div className="w-72 my-2">
          <Select
            label="Card status"
            color="purple"
            value={statusValue}
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={(val) => {
              setExportEnabled(false);
              setStatusValue(val as CardStatusesType | "ALL");
            }}
          >
            {["ALL", ...Object.keys(cardsStatuses)].map((e, index) => (
              <Option key={index + 2} value={e}>
                {e}
              </Option>
            ))}
          </Select>
        </div>
        {statusValue === "INFORMATIONS_VALIDATED" && (
          <div className="md:px-1 h-min md:ml-2">
            <Switch
              ripple={true}
              crossOrigin={null}
              id="Export Enabled"
              className="checked:bg-primary"
              labelProps={{
                className: "text-sm font-bold",
              }}
              containerProps={{
                className: "w-6",
              }}
              circleProps={{
                className: "before:hidden w-3.5 h-3.5 left-0.5 top-2 border-none",
              }}
              defaultChecked={exportEnabled}
              onClick={() => setExportEnabled((prev) => !prev)}
              label="Export enabled"
            />
          </div>
        )}
      </div>
      <div className="px-6">
        <DataTable columns={StudentsTableColumns} data={cards} />
      </div>
    </>
  );
};

export default ImageStudentCards;
