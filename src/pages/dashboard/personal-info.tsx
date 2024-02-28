import { Card as MaterialCard } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import useStudent from "@/hooks/useStudent";
import { formatDate } from "@/utils";
import userImage from "@/assets/img/bruce-mars.jpeg";
import { PencilIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { useSignal } from "@dilane3/gx";
import { StudentCardState } from "@/gx/signals/students.signal";
import QrCodeGenerator from "@/components/Qrgenerator";

export function PersonalInfo() {
  const { id } = useParams();

  if (!id) return;

  useStudent(id);

  const { card: student } = useSignal<StudentCardState>("students");

  if (!student) return;

  return (
    <div className="mt-12">
      <MaterialCard>
        <div className="flex flex-col rounded-[10px] border border-[#808080] bg-white p-[1.25rem] shadow-md">
          <div className="flex flex-row justify-between">
            <div className="flex w-[30%] flex-row items-center">
              {student.avatar && (
                <img
                  //src={student.avatarLink}
                  src={userImage}
                  alt={student.firstName}
                  className="h-20 w-20 rounded-[50%] object-cover"
                />
              )}
              <div className="ml-[0.3125rem] flex flex-col text-[0.875em]">
                <span className="text-[1.375em] font-nunitoBold text-black">
                  {student.matricule}
                </span>
                <span className="text-[1.375em] font-nunitoBold text-black">
                  {student.fullName}
                </span>
              </div>
            </div>
            <div className="flex h-[3.125em] flex-row justify-between">
              <button
                onClick={print}
                className="flex h-[1.875em] w-[5.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all bg-primary hover:bg-primary/80 font-nunitoBold text-white"
              >
                <span> Export</span>
                <PrinterIcon className="w-4 h-4" />
              </button>
              <button
                onClick={print}
                className="flex h-[1.875em] ml-2 w-[4.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all bg-gray-300 hover:bg-primary hover:font-nunitoBold hover:text-white"
              >
                <span> Edit</span>
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-[0.9375rem] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex w-full md:w-1/2 flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information personnelle / Personnal informations
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.lastName}
                  </span>
                  <span> Noms / LastNames</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.firstName}
                  </span>
                  <span> Prénoms / FirstName</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.sex === "MALE" ? "Masculin" : "Feminin"}
                  </span>
                  <span> Sexe / Sex</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {formatDate(student.birthDate)} - {student.nationality}
                  </span>
                  <span> Date et Lieu de naissance / Date and Place of Birth</span>
                </div>

                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {" "}
                    {student.nationality}
                  </span>
                  <span> Nationalité / Nationality</span>
                </div>
              </div>

              <div className=" flex w-full md:w-1/2 md:ml-4 flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information supplementaires
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.sector}
                  </span>
                  <span> Filière / Sector</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.email}
                  </span>
                  <span> Adresse email / Email address</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.phone}
                  </span>
                  <span> Téléphone / Phone</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {new Date(Date.now()).getFullYear() - 1} - {student.academicYear}
                  </span>
                  <span>Année academique / Academic year</span>
                </div>
              </div>
            </div>

            <div className="mt-[1.875rem] flex flex-row justify-between">
              <div className="flex w-full md:w-1/2 flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-lg min-[1350px]:text-xl font-nunitoBold text-[purple]">
                  Information complementaires / Complementary
                </div>
                {/* <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.uniqueId}
                  </span>
                  <span className="text-[0.75em]"> Identifiant Unique</span>
                </div> */}
                <div className="mt-[0.625rem] flex flex-col">
                  <span className=" font-nunitoBold text-black">
                    {student.faculty}
                  </span>
                  <span> Faculté / Faculty</span>
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
