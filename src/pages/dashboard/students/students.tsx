import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tabs,
  Tab,
  TabsHeader,
} from "@material-tailwind/react";

import { PrinterIcon, PhotoIcon, DocumentIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { ExportContext } from "@/context/export";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import ImageStudentCards from "./ImageStudentCards/ImageStudentCards";
import PdfStudentCards from "./PdfStudentCards/PdfStudentCards";
import { useSearchParams } from "react-router-dom";

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
    <Card className="min-h-[600px] mt-12 mb-8 ">
      <CardHeader className="mb-8 p-6 bg-primary flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <Typography variant="h6" color="white">
          Students Table
        </Typography>

        <div className="flex items-center gap-2">
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
              className="flex items-center gap-3 bg-white text-primary"
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
        <div className="flex justify-center my-4">
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
        </div>
      </CardBody>
    </Card>
  );
}
