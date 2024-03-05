import { ExportContext } from "@/context/export";
import { studentsTableData } from "@/data";
import { StudentCardState } from "@/gx/signals/students.signal";
import Document from "@/layouts/exports/document";
import { formatDate } from "@/utils";
import { useActions, useSignal } from "@dilane3/gx";
import {
  Avatar,
  Chip,
  Input,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoadSectors from "@/hooks/useLoadSectors";
import { SectorsActions, SectorsState } from "@/gx/signals/sectors.signal";
import useFilterByDate from "@/hooks/useFilterByDate";
import { useLoadConfiguratedStudentsCards } from "@/hooks/useLoadStudentsCard";

const PdfStudentCards = () => {
  const navigate = useNavigate();

  // Contexts
  const exportContext = useContext(ExportContext);

  // Fetching the list of sectors from the server
  useLoadSectors();

  // Global state
  const { pdfCards: cards } = useSignal<StudentCardState>("students");
  const { sectors, sector } = useSignal<SectorsState>("sectors");
  const { selectSector } = useActions<SectorsActions>("sectors");
  const [cardMode, setCardMode] = useState(false);

  // Cards filtering configurator logic
  const { startDate, endDate, handleSetRangeDate } = useFilterByDate();

  // Loading the cards from the server
  useLoadConfiguratedStudentsCards(startDate, endDate);

  return (
    <>
      <div className="ml-6 w-72 mb-4 my-2 flex items-center gap-4">
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
            onClick={() => {
              setCardMode((prev) => !prev);
            }}
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
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "infos",
                "Nationality",
                "Sex",
                "Status",
                "Registry date",
                "Action",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cards.map((card, key) => {
              const className = `py-3 px-5 ${
                key === studentsTableData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr
                  key={card.id}
                  className="hover:bg-gray-400/30 hover:cursor-pointer transition-all"
                >
                  <td
                    className={className}
                    onClick={() => {
                      navigate(`/dashboard/personal-info/${card.id}`);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {card.avatarLink ? (
                        <div className="flex w-10 h-10 items-center justify-center rounded-full bg-primary">
                          <p className="uppercase text-lg text-white font-nunitoBold">
                            <span>{card.fullName.split(" ")[0].slice(0)[0]}</span>
                            <span className="">
                              {card.fullName.split(" ")[1].slice(0)[0]}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <Avatar
                          src={card.avatarLink}
                          alt={card.firstName}
                          size="sm"
                        />
                      )}
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize line-clamp-1"
                        >
                          {card.fullName}
                        </Typography>
                        <Typography className="text-xs font-normal line-clamp-1 text-blue-gray-500">
                          {card.email}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {card.nationality}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {card.sex}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Chip
                      variant="gradient"
                      color={card.status !== "SUBMITTED" ? "green" : "blue-gray"}
                      value={
                        card.status !== "SUBMITTED" ? "Verified" : "Not Verified"
                      }
                      className="py-0.5 px-2 text-[11px] font-medium"
                    />
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {formatDate(card.createdAt)}
                    </Typography>
                  </td>
                  <td className={className}>
                    <div className="flex w-full h-max items-center gap-3">
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PdfStudentCards;
