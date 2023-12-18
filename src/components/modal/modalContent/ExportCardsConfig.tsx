import { ModalContext } from "@/context/modalContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";

const ExportCardsModal = () => {
  const { handleOpen } = useContext(ModalContext);

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
