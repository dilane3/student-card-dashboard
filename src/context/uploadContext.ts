import React from "react";
import { IUploadStudents } from "../interfaces/uploadInterface";

export const UploadContext = React.createContext<IUploadStudents | undefined>(
  undefined,
);
