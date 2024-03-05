import { ModalContext } from "@/context/modalContext";
import { useContext, useState } from "react";
import CardEntity, {
  CardStatusesType,
  cardsStatuses,
} from "@/entities/studentCard.entity";
import { studentsTableData } from "@/data";
import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Chip,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { formatDate } from "@/utils";
import { PrinterIcon } from "@heroicons/react/24/solid";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";

const ImageStudentCards = () => {
  const navigate = useNavigate();

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
            {["ALL", ...Object.keys(cardsStatuses)].map((e) => (
              <Option value={e}>{e}</Option>
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
                      <Avatar src={card.avatarLink} alt={card.firstName} size="sm" />
                    )}
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold capitalize line-clamp-1"
                      >
                        {card.fullName}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500 line-clamp-1">
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
                    value={card.status !== "SUBMITTED" ? "Verified" : "Not Verified"}
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

                    {exportEnabled ? (
                      <Button
                        onClick={() => handleOpenViewCardModel(card)}
                        className="bg-transparent p-1 m-0 border-0"
                      >
                        <PrinterIcon
                          strokeWidth={2}
                          className="h-6 w-6 text-primary"
                        />
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ImageStudentCards;
