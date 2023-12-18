import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

import { studentsTableData } from "@/data";

import userImage from "../../assets/img/user.png";
import useLoadStudentsCards from "@/hooks/useLoadStudentsCard";
import { StudentCardState } from "@/gx/signals/students.signal";
import { useSignal } from "@dilane3/gx";
import { formatDate } from "@/utils";

export default function Students() {
  // Load students cards
  useLoadStudentsCards();

  // Global state
  const { cards } = useSignal<StudentCardState>("students");

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader className="mb-8 p-6 bg-primary">
          <Typography variant="h6" color="white">
            Students Table
          </Typography>
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
                  {
                    id,
                    firstName,
                    fullName,
                    avatarLink,
                    email,
                    sex,
                    nationality,
                    createdAt,
                    status,
                  },
                  key,
                ) => {
                  const className = `py-3 px-5 ${
                    key === studentsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={avatarLink} alt={firstName} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold capitalize"
                            >
                              {fullName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {nationality}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {sex}
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
                          {formatDate(createdAt)}
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
