import React, { ChangeEvent, DragEvent, FormEvent, ReactNode } from "react";

export type ReactChildren = {
  children: ReactNode;
};

export interface IUploadStudents {
  file: File | null;
  setFile: React.Dispatch<File | null>;
  // progressBars: number[],
  // setProgressBars: React.Dispatch<React.SetStateAction<number[]>>,
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  timeTaken: number;
  setTimeTaken: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  dragActive: boolean;
  setDragActive: React.Dispatch<React.SetStateAction<boolean>>;
  inputFieldRef: React.RefObject<HTMLInputElement>;
  handleDragEvent: (e: FormEvent) => void;
  handleDropEvent: (e: DragEvent<HTMLDivElement>) => void;
  handleChangeEvent: (e: ChangeEvent) => void;
  handleClearEvent: () => void;
  onButtonClickEvent: () => void;
  handleSubmitEvent: (event: FormEvent) => Promise<void>;
}
