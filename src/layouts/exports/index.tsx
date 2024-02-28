// import { useReactToPrint } from "react-to-print";
// import QRCODECARD from "../../assets/img/CNIC_QRCode_Card.png";
import RectoCard from "../../assets/img/recto_v4.svg";
import VersoCard from "../../assets/img/verso_v4.svg";
import team1 from "../../assets/img/team-1.jpeg";
import { useContext, useMemo, useRef, useState } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import StudentContext from "@/context/students";
import Student from "@/entities/student.entity";
import { ExportContext } from "@/context/export";
import { PrinterIcon } from "@heroicons/react/24/solid";

import Page from "./page";
import Document from "./document";
import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
// import { formatDate } from "@/utils";
// import QRCode from "qrcode";

type ExportProps = {
  exportRef?: React.MutableRefObject<null>;
  qrcode?: string | undefined;
};

function Export({ exportRef }: ExportProps) {
  // Context
  const exportContext = useContext(ExportContext);

  // Global state
  const { cards } = useSignal<StudentCardState>("students");

  console.log(cards);

  const newStudent = useMemo(
    () =>
      new Student({
        id: "string",
        firstname: "michel rufin",
        lastname: "btompe tcheufa",
        birthday: new Date(Date.now()),
        profession: "string",
        birthplace: "douala",
        faculty: "informatique",
        avatar: "string",
        sex: "m",
        height: "string",
        fathername: "string",
        mothername: "string",
        address: "string",
        uniqueId: "string",
        identificationPost: "string",
        deliveryDate: new Date(Date.now()),
        expirationDate: new Date(Date.now()),
        numericCode: 1244845,
        qrcode: "sdfsdfsdf",
      }),
    [],
  );

  return (
    <>
      {cards.length > 0 && (
        <div className="w-full">
          <Button
            className="bg-primary hover:bg-primary/80 flex items-center"
            onClick={exportContext?.print}
          >
            <PrinterIcon strokeWidth={2} className="h-6 w-6 mr-2" />
            <Typography className="font-nunitoBold">Export</Typography>
          </Button>

          {/* This will contain all the logic */}
          <div
            ref={exportContext?.exportRef}
            className="w-full flex flex-col items-center"
          >
            <Document cards={cards} />
          </div>
        </div>
      )}
    </>
  );
}

export default Export;
