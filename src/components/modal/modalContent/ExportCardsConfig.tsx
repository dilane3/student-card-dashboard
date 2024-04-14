import { getFilteredStudentCards } from "@/api/students";
import { ModalContext } from "@/context/modalContext";
import { SectorsActions, SectorsState } from "@/gx/signals/sectors.signal";
import useFilterByDate from "@/hooks/useFilterByDate";
import useLoadSectors from "@/hooks/useLoadSectors";
import { useActions, useSignal } from "@dilane3/gx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useContext, useEffect } from "react";

const ExportCardsModal = () => {
  const { handleOpen } = useContext(ModalContext);

  useLoadSectors();

  const { sectors, sector } = useSignal<SectorsState>("sectors");
  const { selectSector } = useActions<SectorsActions>("sectors");

  // Cards filtering configurator logic
  const { startDate, endDate, handleSetRangeDate } = useFilterByDate();

  useEffect(() => {
    (async () => {
      if (sector) {
        await handleFetchConfiguratedCards(sector.id);
      }
    })();
  }, [sector, startDate, endDate]);

  const handleFetchConfiguratedCards = async (sectorId: string) => {
    const response = await getFilteredStudentCards(sectorId, startDate, endDate);

    console.log(response);
  };

  return (
    <Card className="w-full px-2">
      <Typography
        type="h2"
        className="uppercase text-2xl text-center mt-8 text-primary font-bold"
      >
        Export Configurator
      </Typography>
      <CardBody className="flex text-center flex-col gap-4">
        <Typography className="text-lg">Config here</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="filled"
          className="bg-gray-400 uppercase font-bold"
          onClick={handleOpen}
        >
          <Typography className="font-semibold text-base">Cancel</Typography>
        </Button>
        <Button
          variant="filled"
          className="bg-primary uppercase font-bold"
          onClick={handleOpen}
        >
          <Typography className="font-semibold text-base">Export</Typography>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExportCardsModal;
