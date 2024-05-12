import { ExportContext } from "@/context/export";
import { StudentCardState } from "@/gx/signals/students.signal";
import Document from "@/layouts/exports/document";
import { useActions, useSignal } from "@dilane3/gx";
import { Input, Option, Select, Switch } from "@material-tailwind/react";
import { useContext } from "react";
import useLoadSectors from "@/hooks/useLoadSectors";
import { SectorsActions, SectorsState } from "@/gx/signals/sectors.signal";
import useFilterByDate from "@/hooks/useFilterByDate";
import { useLoadConfiguratedStudentsCards } from "@/hooks/useLoadStudentsCard";
import DataTable from "@/components/datatable/DataTable";
import { StudentsTableColumns } from "../students";

type PdfStudentCardsProps = {
  cardMode?: boolean;
  setCardMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const PdfStudentCards = ({
  cardMode = false,
  setCardMode,
}: PdfStudentCardsProps) => {
  // Contexts
  const exportContext = useContext(ExportContext);

  // Fetching the list of sectors from the server
  useLoadSectors();

  // Global state
  const { pdfCards: cards } = useSignal<StudentCardState>("students");
  const { sectors, sector } = useSignal<SectorsState>("sectors");
  const { selectSector } = useActions<SectorsActions>("sectors");

  // Cards filtering configurator logic
  const { startDate, endDate, handleSetRangeDate } = useFilterByDate();

  // Loading the cards from the server
  useLoadConfiguratedStudentsCards(startDate, endDate);

  return (
    <>
      <div className="ml-6 w-72 mb-4 my-2 flex flex-col lg:flex-row lg:items-center gap-4">
        <Select
          label="Sector"
          color="purple"
          value={sector?.name}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(val) => {
            selectSector(sectors.find((elmt) => elmt.name === val));
          }}
        >
          {sectors.length > 0 &&
            sectors.map(({ name, id }, idx) => (
              <Option key={id + idx} value={name}>
                {name}
              </Option>
            ))}
        </Select>

        <Input
          crossOrigin={null}
          type="date"
          name="start_date"
          label="Start_date"
          id="start_date"
          className="shadow-md cursor-text"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            handleSetRangeDate(new Date(e.target.value), "start_date")
          }
        />

        <Input
          crossOrigin={null}
          type="date"
          name="end_date"
          label="End_date"
          id="end_date"
          className="shadow-md cursor-text "
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) => handleSetRangeDate(new Date(e.target.value), "end_date")}
        />

        <div className="md:px-1 h-min">
          <Switch
            ripple={true}
            className="checked:bg-primary"
            crossOrigin={null}
            id="CardMode"
            labelProps={{
              className: "text-sm font-bold w-max",
            }}
            containerProps={{
              className: "w-6",
            }}
            circleProps={{
              className: "before:hidden w-3.5 h-3.5 left-0.5 top-2 border-none",
            }}
            defaultChecked={cardMode}
            onClick={() => setCardMode((prev) => !prev)}
            label="Card Display"
          />
        </div>
      </div>
      {cardMode ? (
        <div
          ref={exportContext?.exportRef}
          className="w-full flex flex-col items-center"
        >
          <Document cards={cards} />
        </div>
      ) : (
        <div className="px-6">
          <DataTable columns={StudentsTableColumns} data={cards} />
        </div>
      )}
    </>
  );
};

export default PdfStudentCards;
