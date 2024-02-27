import { ExportContext, ExportContextType } from "@/context/export";
import StudentContext from "@/context/students";
import { Card as MaterialCard } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
//import QRCode from "qrcode";
import useStudent from "@/hooks/useSudent";
import { formatDate } from "@/utils";
import userImage from "@/assets/img/bruce-mars.jpeg";
import { PencilIcon, PrinterIcon } from "@heroicons/react/24/solid";
import Export from "@/layouts/exports";
import Student from "@/entities/student.entity";
import Card from "@/entities/studentCard.entity";

export function PersonalInfo() {

 
  
  const exportContext = useContext<ExportContextType | null>(ExportContext);

  //const { student } = useContext(StudentContext);
  const {id} = useParams();

  if(!id){
    return null;
  }
  useStudent(id);
  console.log("studen*******************************t",id);

 // const location = useLocation();
 // const {student : student} = location.state;
  // const {student : student} = location.state;

  const [student, setStudent] = useState <Card|null>(null);

  // useEffect(() => {
  //   const fetchStudent = async () => {
  //     const response = await getStudentById(id);
  //     if (response.data) {
  //       setStudent(response.data);
  //     }
  //   };

  //   fetchStudent();
  // }, [id]);


  // const [inputText, setInputText] = useState(student?.qrcode?.toString());

  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   console.log(inputText);
  //   if (canvasRef.current) {
  //     QRCode.toCanvas(
  //       canvasRef.current,
  //       inputText || " ",
  //       (error: any) => error && console.error()
  //     );
  //   }
  // }, [inputText, canvasRef.current]);

  console.log("student",student);
  //.log("studentemail",student.birthday);


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
                src={ userImage}
                alt={student.firstName }
                className="h-20 w-20 rounded-[50%] object-cover"
              />
              
            )}
              <div className="ml-[0.3125rem] flex flex-col text-[0.875em]">
                <span className="text-[1.375em] font-bold text-black">
                  {student.matricule }
                </span>
                <span className="text-[1.375em] font-bold text-black">
                  {student.fullName}
                </span>
              </div>
            </div>
            <div className="flex h-[3.125em] w-[20%] flex-row justify-between">
              <button
                onClick={print}
                className="flex h-[1.875em] w-[5.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all bg-gray-300 hover:bg-[purple] hover:font-bold hover:text-white"
              >
                <span> Export</span>
                <PrinterIcon className="w-4 h-4"/>
              </button>
              <button
                onClick={print}
                className="flex h-[1.875em] w-[4.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all bg-gray-300 hover:bg-[purple] hover:font-bold hover:text-white"
              >
                <span> Edit</span>
                <PencilIcon className="w-4 h-4"/>
              </button>
            </div>
          </div>
          <div className="mt-[0.9375rem] flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-[0.875em] font-bold text-[purple]">
                  Information personnelle / Personnal informations
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.lastName}
                  </span>
                  <span className="text-[0.75em]"> Noms / LastNames</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.firstName}
                  </span>
                  <span className="text-[0.75em]"> Prénoms / FirstName</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.sex === "MALE" ? "Masculin" : "Feminin"}
                  </span>
                  <span className="text-[0.75em]"> Sexe / Sex</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                  {formatDate(student.birthDate)} - {student.nationality}
                  </span>
                  <span className="text-[0.75em]"> Date et Lieu de naissance / Date and Place of Birth</span>
                </div>
                
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {" "}
                    {student.nationality}
                  </span>
                  <span className="text-[0.75em]"> Nationnalité / Nationnality</span>
                </div>
              </div>

              <div className=" flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-[0.875em] font-bold text-[purple]">
                  Information supplementaires
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.sector}
                  </span>
                  <span className="text-[0.75em]"> Filière / Sector</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.email}
                  </span>
                  <span className="text-[0.75em]"> Adresse email / Email address</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.phone}
                  </span>
                  <span className="text-[0.75em]"> Téléphone / Phone</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                     {student.academicYear}
                  </span>
                  <span className="text-[0.75em]">Année academique / Academic year</span>
                </div>
              </div>
            </div>

            <div className="mt-[1.875rem] flex flex-row justify-between">
              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-[0.875em] font-bold text-[purple]">
                  Information complementaires / Complementary
                </div>
                {/* <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.uniqueId}
                  </span>
                  <span className="text-[0.75em]"> Identifiant Unique</span>
                </div> */}
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    Faculté des sciences
                  </span>
                  <span className="text-[0.75em]"> Faculté / Faculty</span>
                </div>
                
                {/* <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {formatDate(student.deliveryDate)}
                  </span>
                  <span className="text-[0.75em]"> Date de delivrance</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {formatDate(student.expirationDate)}
                  </span>
                  <span className="text-[0.75em]"> Date d'expiration</span>
                </div> */}
              </div>

              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-b-[purple] text-[0.875em] font-bold text-[purple]">
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
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {" "}
                    {student.code}{" "}
                  </span>
                  <span className="text-[0.75em]"> Code Numerique</span>
                </div>
              </div>
              <div style={{ display: "none" }}>
                {/* <Export
                  exportRef={exportContext!.exportRef}
                  qrcode={inputText}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </MaterialCard>
    </div>
  );
}
