import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tabs,
  Tab,
  TabsHeader,
  Chip,
  Avatar,
} from "@material-tailwind/react";

import { PrinterIcon, PhotoIcon, DocumentIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { ExportContext } from "@/context/export";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import ImageStudentCards from "./ImageStudentCards/ImageStudentCards";
import PdfStudentCards from "./PdfStudentCards/PdfStudentCards";
import { useSearchParams, useNavigate } from "react-router-dom";

import { formatDate } from "@/utils";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { ColumnDef } from "@tanstack/react-table";
import CustomCheckbox from "@/components/CustomCheckbox";
import CardEntity from "@/entities/studentCard.entity";

const TabsData = [
  {
    label: "Image",
    value: "image",
    icon: PhotoIcon,
  },
  {
    label: "Pdf",
    value: "pdf",
    icon: DocumentIcon,
  },
];

export default function Students() {
  // Contexts
  const exportContext = useContext(ExportContext);

  // Local state
  const [exportMode, setExportMode] = useState(TabsData[0].value);

  // Observer for displaying the students list in card mode for pdf export
  const [cardMode, setCardMode] = useState(false);

  // Getting the URL parameters
  const [filterParams, setFilterParams] = useSearchParams();
  const [query, setQuery] = useState(filterParams.get("query") || "");
  const page = filterParams.get("page") || 1;
  const offset = filterParams.get("offset") || 10;

  // Updating the url parameters
  const hqndlerUpdateParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    setFilterParams({
      query: newQuery,
      page: page.toString(),
      offset: offset.toString(),
    });
  };

  return (
    <Card className="min-h-[400px] mt-12 mb-8 ">
      <CardHeader className="mb-8 p-6 bg-primary flex flex-col md:flex-row md:justify-between md:items-center">
        <Typography variant="h6" color="white">
          Students Table
        </Typography>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Tabs value="image">
            <TabsHeader className="bg-white">
              {TabsData.map(({ label, value, icon }) => (
                <Tab key={value} value={value} onClick={() => setExportMode(value)}>
                  <div className="flex items-center gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          {exportMode === TabsData[1].value && (
            <Button
              // onClick={handleOpenCreateAgentModal}
              onClick={exportContext?.print}
              className="flex items-center justify-center gap-3 bg-white text-primary"
              disabled={!cardMode}
              size="md"
            >
              <PrinterIcon strokeWidth={2} className="h-6 w-6" /> Export Cards
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto min-h-[500px] flex flex-col justify-between px-0 pt-2 pb-2">
        <div>
          {exportMode === TabsData[0].value ? (
            <ImageStudentCards />
          ) : (
            <PdfStudentCards cardMode={cardMode} setCardMode={setCardMode} />
          )}
        </div>
        {/* <div className="flex justify-center my-4">
          <DefaultPagination
            paginationEntry={{
              currentPage: 1,
              totalPages: 2,
              goToPage: (page: number) => {},
              goToNextPage: () => {},
              goToPreviousPage: () => {},
              startIndex: 1,
              endIndex: 20,
            }}
          />
        </div> */}
      </CardBody>
    </Card>
  );
}

export const StudentsTableColumns: ColumnDef<CardEntity>[] = [
  {
    id: "select",
    header: ({ table }) => {
      console.log(table.getIsAllPageRowsSelected());

      return (
        <div className="flex justify-start ml-2 w-min">
          <CustomCheckbox
            checkedBox={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-start ml-2 w-min">
          <CustomCheckbox
            checkedBox={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
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
    filterFn: (row, _, filterValue) => {
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
      const cardStatus = row.original.status;

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
      const value = row.original.createdAt;

      return (
        <div>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {formatDate(value)}
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
      const navigate = useNavigate();

      const card = row.original;
      
      const handleViewCard = () => {
        navigate(`/dashboard/personal-info/${card.id}`);
      }

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="text" className="bg-gray-300/70 px-2">
            Edit
          </Button>
          <Button
            onClick={handleViewCard}
            size="sm"
            variant="text"
            className="bg-gray-300/70 px-2"
          >
            View
          </Button>
        </div>
      );
    },
  },
];
