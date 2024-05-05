import FilterAndResearch from "@/components/filterAndResearch/FilterAndResearch";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import { ModalContext } from "@/context/modalContext";
import { Faculty } from "@/entities/faculty.entity";
import {
  FacultiesActions,
  FacultiesOperations,
  FacultiesState,
} from "@/gx/signals/faculties.signal";
import { useLoadPaginatedFaculties } from "@/hooks/useLoadFaculties";
import usePagination from "@/hooks/usePagination";
import { formatDate, ITEM_PER_PAGE } from "@/utils";
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
import { useContext, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Names",
    value: "names",
  },
  {
    label: "Description",
    value: "Description",
  },
];
const TABLE_HEAD = ["Name", "Registered At", "Actions"];

export function Faculties() {
  const { handleOpen, dispatch } = useContext(ModalContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Getting the URL parameters
  const [filterParams] = useSearchParams();
  // Getting the page value
  const page = Number(filterParams.get("page")) || 0;
  // Getting the offset value
  const offset = Number(filterParams.get("offset")) || 20;
  // Getting the query value
  const [query, setQuery] = useState(filterParams.get("query") || "");

  useLoadPaginatedFaculties({
    offset: parseInt(page.toString()),
    limit: parseInt(offset.toString()),
    search: query,
  });

  // Updating the search url parameters
  const handlerUpdateSearchParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryParams = new URLSearchParams(filterParams);
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery) {
      queryParams.set("query", newQuery);
    } else {
      queryParams.delete("query");
    }

    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  // Updating the url parameters
  // const handlerUpdateParams = () => {
  //   setFilterParams({
  //     page: page.toString(),
  //     offset: offset.toString(),
  //   });
  // };

  // Global state
  const { paginatedFaculties: faculties } = useSignal<FacultiesState>("faculties");

  // Actions
  const { selectFaculty } = useActions<FacultiesActions>("faculties");

  // Operations
  const { getFaculty } = useOperations<FacultiesOperations>("faculties");

  // Handlers

  const handleOpenCreateFacultyModal = () => {
    if (!dispatch) return;

    dispatch({ type: "ADD_FACULTY" });
    handleOpen();
  };

  const handleOpenUpdateFacultyModal = (id: string) => {
    const selectedFaculty = getFaculty(id);
    if (!selectedFaculty || !dispatch) return;

    dispatch!({ type: "UPDATE_FACULTY" });
    handleOpen();
    selectFaculty(selectedFaculty);
  };

  const handleOpenDeleteModal = (id: string) => {
    const selectedFaculty = getFaculty(id);
    if (!dispatch || !selectedFaculty) return;

    dispatch({ type: "DELETE_CONFIRMATION" });
    handleOpen();
    selectFaculty(selectedFaculty);
  };

  const {
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    startIndex,
    endIndex,
  } = usePagination(faculties.length, ITEM_PER_PAGE);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              List of faculties
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Below are the informations about faculties
            </Typography>
          </div>
          <Button
            onClick={handleOpenCreateFacultyModal}
            className="flex items-center gap-3 bg-primary"
            size="md"
          >
            <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Add a faculty
          </Button>
        </div>
        <FilterAndResearch
          tabsList={TABS}
          query={query}
          withTabs={false}
          handleChange={handlerUpdateSearchParams}
        />
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
            {faculties.map(({ name, createdAt, id }, index) => {
              const isLast = index === faculties.length - 1;
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
                      <IconButton
                        variant="text"
                        onClick={() => handleOpenUpdateFacultyModal(id)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Faculty">
                      <IconButton
                        onClick={() => handleOpenDeleteModal(id)}
                        variant="text"
                      >
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
        <DefaultPagination
          paginationEntry={{
            currentPage,
            totalPages,
            goToPage,
            goToNextPage,
            goToPreviousPage,
            startIndex,
            endIndex,
          }}
        />
      </CardFooter>
    </Card>
  );
}
