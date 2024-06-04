import {
  Avatar,
  Button,
  Card as MaterialCard,
  Option,
  Select,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import useStudent from "@/hooks/useStudent";
import { formatDate } from "@/utils";
import userImage from "@/assets/img/user.png";
import { PencilIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
import QrCodeGenerator from "@/components/Qrgenerator";
import { useContext, useEffect, useState } from "react";
import Card, {
  CardStatusesType,
  cardsStatuses,
} from "@/entities/studentCard.entity";
import { updateStudentCardStatus } from "@/api/students";
import { ModalContext } from "@/context/modalContext";
import { toast } from "react-toastify";

export function PersonalInfo() {
  const { id } = useParams();

  if (!id) return;

  useStudent(id);

  const { handleOpen, dispatch } = useContext(ModalContext);

  const { card: student } = useSignal<StudentCardState>("students");

  const [statusValue, setStatusValue] = useState<CardStatusesType | undefined>(
    student?.status,
  );

  useEffect(() => {
    setStatusValue(student?.status);
  }, [student]);

  /**
   * Function to update the card status
   */
  const handleUpdateCardStatus = async () => {
    if (!student || !statusValue) return;

    if (
      statusValue === "INFORMATIONS_VALIDATED" ||
      statusValue === "PRINTED" ||
      statusValue === "AVAILABLE"
    ) {
      if (!student.avatar || !student.email || !student.phone) {
        toast.error("Missing avatar, email or phone number");
        return;
      }
    }

    const { data } = await updateStudentCardStatus(student.id, statusValue);

    if (data) {
      toast.success("Card status updated successfully");
    } else {
      toast.error("Card status update failed");
    }
  };

  /**
   * Function to view and export the card in image format
   */
  const handleOpenViewCardModel = (card: Card) => {
    if (!dispatch) return;

    dispatch({ type: "VIEW_CARD", payload: card });
    handleOpen();
  };

  if (!student) return;

  return (
    <div className="mt-8">
      <div className="flex h-[3.125em] flex-row items-center gap-2 mb-2 justify-end">
        {student.status === "INFORMATIONS_VALIDATED" && (
          <Button
            onClick={() => handleOpenViewCardModel(student)}
            className="flex bg-primary hover:bg-primary/80 items-center gap-3"
          >
            <PrinterIcon className="w-4 h-4" />
            Export
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={print}
          className="flex items-center gap-3"
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </Button>
      </div>
      <MaterialCard>
        <div className="flex flex-col rounded-[10px] border border-[#808080] bg-white p-[1.25rem] shadow-md">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
            <div className="flex w-[50%] flex-row gap-2 items-center">
              <Avatar
                src={student.avatarLink}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = userImage;
                }}
                alt={student.name}
              />
              <div className="flex flex-row-reverse md:flex-col text-[0.875em]">
                <p className="text-[1.375em] ml-2 md:ml-0 font-nunitoBold text-black">
                  {student.matricule}
                </p>
                <p className="text-[1.375em] font-nunitoBold text-black">
                  {student.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="w-full sm:w-72 my-2">
                <Select
                  label="Card status"
                  color="purple"
                  value={statusValue}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  onChange={(val) => setStatusValue(val as CardStatusesType)}
                >
                  {Object.keys(cardsStatuses).map((e) => (
                    <Option value={e}>{e}</Option>
                  ))}
                </Select>
              </div>
              <Button
                onClick={handleUpdateCardStatus}
                className="bg-primary hover:bg-primary/80"
              >
                Change
              </Button>
            </div>
          </div>
          <div className="mt-[0.9375rem] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex w-full md:w-1/2  space-y-8  flex-col">
                <div className=" border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information personnelle / Personnal informations
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="font-nunitoBold text-black">
                      {student.name}
                    </span>
                    <span className="text-xs"> Noms & Prénoms / LastName & FirstName</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-nunitoBold text-black">
                      {student.sex === "MALE" ? "Masculin" : "Feminin"}
                    </span>
                    <span className="text-xs"> Sexe / Sex</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-nunitoBold text-black">
                      {formatDate(student.birthDate)} - {student.nationality}
                    </span>
                    <span className="text-xs"> Date et Lieu de naissance / Date and Place of Birth</span>
                  </div>

                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {" "}
                      {student.nationality}
                    </span>
                    <span className="text-xs"> Nationalité / Nationality</span>
                  </div>
                </div>
              </div>

              <div className=" flex w-full md:w-1/2 md:ml-4 flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information supplementaires
                </div>
                <div className="space-y-4 mt-[24px]">

                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {student.sector}
                    </span>
                    <span className="text-xs"> Filière / Sector</span>
                  </div>
                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {student.email}
                    </span>
                    <span className="text-xs"> Adresse email / Email address</span>
                  </div>
                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {student.phone}
                    </span>
                    <span className="text-xs"> Téléphone / Phone</span>
                  </div>
                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {student.paymentStatus}
                    </span>
                    <span className="text-xs">Statut de Paiement / Payment Status</span>
                  </div>
                  <div className="mt-[0.625rem] flex flex-col">
                    <span className=" font-nunitoBold text-black">
                      {new Date(Date.now()).getFullYear() - 1} - {student.academicYear}
                    </span>
                    <span className="text-xs">Année academique / Academic year</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[1.875rem] flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
              <div className="flex w-full md:w-1/2 space-y-2 flex-col">
                <div className="border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information complementaires / Complementary
                </div>
                {/* <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.uniqueId}
                  </span>
                  <span className="text-[0.75em]"> Identifiant Unique</span>
                </div> */}
                <div className="">
                  <p className="font-nunitoBold text-black">{student.faculty}</p>
                  <p className="text-xs"> Faculté / Faculty</p>
                </div>

                {/* <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-nunitoBold text-black">
                    {formatDate(student.deliveryDate)}
                  </span>
                  <span className="text-[0.75em]"> Date de delivrance</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-nunitoBold text-black">
                    {formatDate(student.expirationDate)}
                  </span>
                  <span className="text-[0.75em]"> Date d'expiration</span>
                </div> */}
              </div>

              <div className="flex w-full md:w-1/2 md:ml-4 flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Codes
                </div>
                {/* <div style={{ display: "flex" }}>
                  <div>
                    <input
                      className=""
                      value={student.qrcode!}
                      onChange={(e) => setInputText(e.target.value)}
                      hidden
                      style={{ display: "none" }}
                    />
                    <br />
                  </div>
                  <canvas className="" ref={canvasRef} />
                </div> */}
                {/* <QRCodeSVG
                    value={student.qrcode}
                    style={{ marginTop: 20, marginBottom: 10 }}
                  /> */}
                <div className="flex justify-between">
                  <div className="mt-[0.625rem] flex flex-col">
                    <span className="text-[0.875em] font-nunitoBold text-black">
                      {student.code}
                    </span>
                    <span className="text-[0.75em]">Code Numerique</span>
                  </div>
                  <div>
                    <QrCodeGenerator code={student.code} width={140} height={140} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaterialCard>
    </div>
  );
}
