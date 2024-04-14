import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

type PaginationEntryProps = {
  paginationEntry: {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    startIndex: number;
    endIndex: number;
  };
};

export function DefaultPagination({ paginationEntry }: PaginationEntryProps) {
  const [active, setActive] = React.useState(1);

  const { currentPage, totalPages, goToPage, goToNextPage, goToPreviousPage } =
    paginationEntry;

  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      className: currentPage === index ? "bg-primary" : "",
      onClick: () => setActive(index),
    }) as any;

  const next = () => {
    if (active === 2) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 transition-colors hover:bg-primary hover:bg-opacity-80 hover:text-white"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />

        <Typography className="hidden sm:block text-xs font-bold ">
          Précédent
        </Typography>
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index}
            onClick={() => goToPage(index + 1)}
            className="bg-invisible h-"
          >
            <IconButton {...getItemProps(index + 1)}>{index + 1}</IconButton>
          </div>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 transition-colors hover:bg-primary hover:bg-opacity-80 hover:text-white"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <Typography className="hidden sm:block text-xs font-bold ">
          Suivant
        </Typography>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
