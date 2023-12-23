import FilterAndResearch from "@/components/filterAndResearch/FilterAndResearch";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import { ModalContext } from "@/context/modalContext";
import { Sector as SectorEntity } from "@/entities/sector.entity";
import { SectorsState } from "@/gx/signals/sectors.signal";
import { formatDate } from "@/utils";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useContext } from "react";

const TABS = [
  {
    label: "Tous",
    value: "tous",
  },
  {
    label: "Noms",
    value: "noms",
  },
  {
    label: "Description",
    value: "Description",
  },
];

const TABLE_HEAD = ["Name", "Registered At", "Actions"];

export function Sectors() {
  const { handleOpen, dispatch } = useContext(ModalContext);

  // Global state
  const { sectors } = useSignal<SectorsState>("sectors");

  // Actions
  const { selectSector } = useActions("sectors");

  // Operations
  const { getSector } = useOperations("sectors");

  const handleOpenCreateSectorModal = () => {
    if (!dispatch) return;

    dispatch!({ type: "ADD_SECTOR" });
    handleOpen();
  };

  const handleOpenUpdateSectorModal = (id: string) => {
    if (!dispatch) return;

    dispatch!({ type: "UPDATE_SECTOR" });
    handleOpen();
    selectSector(getSector(id));
  };

  const handleOpenDeleteModal = (id: string) => {
    if (!dispatch) return;

    dispatch!({ type: "DELETE_CONFIRMATION" });
    handleOpen();
    selectSector(getSector(id));
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              List of academic sectors
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Bellow are informations about academic sectors
            </Typography>
          </div>
          <Button
            onClick={handleOpenCreateSectorModal}
            className="flex items-center gap-3 bg-primary"
            size="md"
          >
            <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Add a sector
          </Button>
        </div>
        <FilterAndResearch tabsList={TABS} />
      </CardHeader>
      <CardBody className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-primary bg-opacity-80 p-4 transition-colors hover:bg-opacity-100"
                >
                  <Typography
                    variant="h6"
                    color="white"
                    className="flex items-center justify-between gap-2 font-bold leading-none"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sectors.map(({ name, createdAt, id }, index) => {
              const isLast = index === sectors.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="text-lg font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="text-lg font-medium"
                    >
                      {formatDate(createdAt)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Faculty">
                      <IconButton variant="text" onClick={() => handleOpenUpdateSectorModal(id)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Faculty">
                      <IconButton onClick={() => handleOpenDeleteModal(id)} variant="text">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <DefaultPagination />
      </CardFooter>
    </Card>
  );
}
