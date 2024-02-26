import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";

import { studentsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/img/user.png";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";
import { StudentCardState } from "@/gx/signals/students.signal";
import { useSignal } from "@dilane3/gx";
import { formatDate } from "@/utils";
import { PrinterIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "@/context/modalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import StudentContext, {StudentContextType} from "@/context/students";

export default function Students() {
  const navigate = useNavigate();
  // Load students cards
  useLoadStudentsCards();

  // Contexts
  const { handleOpen, dispatch } = useContext(ModalContext);
  const { setCurrentStudent } = useContext<StudentContextType>(StudentContext);
  // Global state
  const { cards } = useSignal<StudentCardState>("students");

  const handleOpenCreateAgentModal = () => {
    if (!dispatch) return;

    dispatch!({ type: "EXPORT_CARDS" });
    handleOpen();
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader className="mb-8 p-6 bg-primary flex justify-between items-center">
          <Typography variant="h6" color="white">
            Students Table
          </Typography>

          <Button onClick={handleOpenCreateAgentModal} className="flex items-center gap-3 bg-white text-primary" size="md">
            <PrinterIcon strokeWidth={2} className="h-6 w-6" /> Export Cards
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "infos",
                  "Nationality",
                  "sex",
                  "status",
                  "registered at",
                  "Action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map(
                (
                  card,
                  key,
                ) => {
                  const className = `py-3 px-5 ${
                    key === studentsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={card.id} >
                      <td className={className}  onClick={() => {
                        navigate(`/dashboard/personal-info/${card.id}`);
                      }}>
                        <div className="flex items-center gap-4">
                          <Avatar src={card.avatarLink} alt={card.firstName} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold capitalize"
                            >
                              {card.fullName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {card.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                     
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {card.nationality}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {card.sex}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status !== "SUBMITTED" ? "green" : "blue-gray"}
                          value={
                            status !== "SUBMITTED" ? "Verified" : "Not Verified"
                          }
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formatDate(card.createdAt)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
