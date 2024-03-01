import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Switch,
} from "@material-tailwind/react";

import { studentsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";
import { StudentCardState } from "@/gx/signals/students.signal";
import { useSignal } from "@dilane3/gx";
import { formatDate } from "@/utils";
import { PrinterIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "@/context/modalContext";
import { useContext, useState } from "react";
import Document from "@/layouts/exports/document";
import { ExportContext } from "@/context/export";

export default function Students() {
  const navigate = useNavigate();
  // Load students cards
  useLoadStudentsCards();

  // Contexts
  const { handleOpen, dispatch } = useContext(ModalContext);
  const exportContext = useContext(ExportContext);

  // Global state
  const { cards, loading } = useSignal<StudentCardState>("students");

  // Local state
  const [cardMode, setCardMode] = useState(false);

  /**
   *
   * @returns
   */
  const handleViewCardModal = () => {
    if (!dispatch) return;

    dispatch!({ type: "EXPORT_CARDS" });
    handleOpen();
  };

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader className="mb-8 p-6 bg-primary flex justify-between items-center">
              <Typography variant="h6" color="white">
                Students Table
              </Typography>

              <div className="flex gap-2">
                <Switch
                  crossOrigin={null}
                  id="CardMode"
                  labelProps={{
                    className: "text-sm font-bold text-white",
                  }}
                  defaultChecked={cardMode}
                  onClick={() => {
                    setCardMode((prev) => !prev);
                  }}
                  label="Card Mode"
                />
                <Button
                  // onClick={handleOpenCreateAgentModal}
                  onClick={exportContext?.print}
                  className="flex items-center gap-3 bg-white text-primary"
                  size="md"
                >
                  <PrinterIcon strokeWidth={2} className="h-6 w-6" /> Export Cards
                </Button>
              </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                        "sex",
                        "status",
                        "registered at",
                        "Action",
                      ].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
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
                                    <span>
                                      {card.fullName.split(" ")[0].slice(0)[0]}
                                    </span>
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
                                  className="font-semibold capitalize"
                                >
                                  {card.fullName}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
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
                              color={status !== "SUBMITTED" ? "green" : "blue-gray"}
                              value={
                                status !== "SUBMITTED" ? "Verified" : "Not Verified"
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

                              <Button
                                onClick={handleViewCardModal}
                                className="bg-transparent p-1 m-0 border-0"
                              >
                                <PrinterIcon
                                  strokeWidth={2}
                                  className="h-6 w-6 text-primary"
                                />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
