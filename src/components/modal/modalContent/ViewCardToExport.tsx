import { ModalContext } from "@/context/modalContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useCallback, useContext, useRef, useState } from "react";
import CardRecto from "@/components/molecules/cards/CardRecto";
import CardVerso from "@/components/molecules/cards/CardVerso";
import useConvertToPng from "@/hooks/useConvertToImg";
import { toast } from "react-toastify";
import JSZip from "jszip";

const ViewCardToExportModal = () => {
  const {
    handleOpen,
    state: { data: card },
  } = useContext(ModalContext);

  // Local state
  const [loading, setLoading] = useState(false);

  // Refs
  const rectoRef = useRef(null);
  const versoRef = useRef(null);

  // Get images
  const rectoImg = useConvertToPng(rectoRef);
  const versoImg = useConvertToPng(versoRef);

  // Handlers
  const handleExport = useCallback(async () => {
    if (!rectoImg || !versoImg) return;

    setLoading(true);

    const zip = new JSZip();
    
    zip.file("recto.png", rectoImg.replace("data:image/png;base64,", ""), {
      base64: true,
    });
    zip.file("verso.png", versoImg.replace("data:image/png;base64,", ""), {
      base64: true,
    });

    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        setLoading(false);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);

        link.download = `${card.fullName.replace(" ", "_")}-${card.matricule}.zip`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        toast.success("Card exported successfully");
        handleOpen();
      })
      .catch(() => {
        setLoading(false);
        toast.error("An error occurred while exporting the card");
      });
  }, [rectoImg, versoImg]);

  return (
    <Card className="w-full px-2">
      <Typography
        type="h2"
        className="uppercase text-2xl text-center mt-8 text-primary font-bold"
      >
        Student Card
      </Typography>
      <CardBody className="overflow-auto w-[100%]">
        <div className="h-[300px] overflow-auto gap-2 flex flex-col items-center">
          <div ref={rectoRef} className="p-1 bg-white rounded-2xl">
            <CardRecto card={card} />
          </div>

          <div ref={versoRef} className="p-1 bg-white rounded-2xl">
            <CardVerso card={card} />
          </div>
        </div>
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
          onClick={handleExport}
          disabled={!rectoImg || !versoImg || loading}
        >
          <Typography className="font-semibold text-base">
            {loading
              ? "Exporting..."
              : !rectoImg || !versoImg
              ? "Preparing Export..."
              : "Export"}
          </Typography>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewCardToExportModal;
