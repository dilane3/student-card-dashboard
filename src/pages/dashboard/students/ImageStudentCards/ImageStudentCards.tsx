import { ModalContext } from "@/context/modalContext";
import { useContext, useState } from "react";
import CardEntity, {
  CardStatusesType,
  cardsStatuses,
} from "@/entities/studentCard.entity";
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
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";
import { ColumnDef, Row } from "@tanstack/react-table";
import DataTable from "@/components/datatable/DataTable";

const columns: ColumnDef<CardEntity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="text"
          className="border-b w-full flex border-blue-gray-50 py-3 px-5 text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Infos
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const email = row.original.email;
      const name = row.original.email;
      return (
        name.includes((filterValue as string).toLowerCase()) ||
        email.includes((filterValue as string).toLowerCase())
      );
    },
    cell: ({ row }) => {
      const card = row.original;
      return (
        <div className="flex items-center ml-4 gap-4">
          {card.avatarLink ? (
            <div className="flex w-10 h-10 items-center justify-center rounded-full bg-primary">
              <p className="uppercase text-lg text-white font-nunitoBold">
                <span>{card.name.split(" ")[0].slice(0)[0]}</span>
                {card.name.split(" ")[1] && (
                  <span className="">{card.name.split(" ")[1].slice(0)[0]}</span>
                )}
              </p>
            </div>
          ) : (
            <Avatar src={card.avatarLink} alt={card.name} size="sm" />
          )}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold capitalize line-clamp-1"
            >
              {card.name}
            </Typography>
            <Typography className="text-xs font-normal text-blue-gray-500 line-clamp-1">
              {card.email}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "nationality",
    header: () => (
      <div className="border-b border-blue-gray-50 py-3 text-left">Nationality</div>
    ),
    cell: ({ row }) => {
      const { nationality } = row.original;
      return <div className=" font-medium">{nationality}</div>;
    },
  },
  {
    accessorKey: "sex",
    header: () => (
      <div className="border-b border-blue-gray-50 py-3 text-left">Sex</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="border-b border-blue-gray-50 py-3 text-left">Status</div>
    ),
    cell: ({ row }) => {
      const cardStatus = row.getValue("status");

      return (
        <Chip
          variant="gradient"
          color={cardStatus !== "SUBMITTED" ? "green" : "blue-gray"}
          value={cardStatus !== "SUBMITTED" ? "Verified" : "Not Verified"}
          className="py-0.5 px-2 w-min text-[11px] font-medium"
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="border-b border-blue-gray-50 py-3 text-left">CreatedAt</div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt");

      return (
        <div>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {formatDate(value as Date)}
          </Typography>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="border-b border-blue-gray-50 py-3 text-left">Action</div>
    ),
    cell: ({ row }) => {
      const card = row.original;
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="text" className="bg-red-300">
            Edit
          </Button>
          <Button
            onClick={() => window.location.replace(`/dashboard/students/${card.id}`)}
            size="sm"
            variant="text"
            className="bg-green-300"
          >
            View
          </Button>
        </div>
      );
    },
  },
];

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
        <DataTable columns={columns} data={cards} />
      </div>

      {/* <table className="w-full min-w-[640px] table-auto">
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
                          <span>{card.name.split(" ")[0].slice(0)[0]}</span>
                          {card.name.split(" ")[1] && (
                            <span className="">
                              {card.name.split(" ")[1].slice(0)[0]}
                            </span>
                          )}
                        </p>
                      </div>
                    ) : (
                      <Avatar src={card.avatarLink} alt={card.name} size="sm" />
                    )}
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold capitalize line-clamp-1"
                      >
                        {card.name}
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
      </table> */}
    </>
  );
};

export default ImageStudentCards;
