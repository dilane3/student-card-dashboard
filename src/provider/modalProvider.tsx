import { DialogContainer } from "@/components/modal/ModalContainer";
import CreateAcademicYearModal from "@/components/modal/modalContent/CreateAcademicYearModal";
import CreateAgentModal from "@/components/modal/modalContent/CreateAgentModal";
import CreateFacultyModal from "@/components/modal/modalContent/CreateFacultyModal";
import CreateSectorModal from "@/components/modal/modalContent/CreateSectorModal";
import DeleteConfirmationModal from "@/components/modal/modalContent/DeleteConfirmationModal";
import ExportCardsModal from "@/components/modal/modalContent/ExportCardsConfig";
import ViewCardToExportModal from "@/components/modal/modalContent/ViewCardToExport";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { ReactNodeChildren } from "@/types";
import { ReactNode, useReducer, useState } from "react";

const ModalActions = {
  ADD_FACULTY: "ADD_FACULTY",
  ADD_SECTOR: "ADD_SECTOR",
  ADD_ACADEMIC_YEAR: "ADD_ACADEMIC_YEAR",
  DELETE_CONFIRMATION: "DELETE_CONFIRMATION",
  ADD_AGENT: "ADD_AGENT",
  EXPORT_CARDS: "EXPORT_CARDS",
  UPDATE_FACULTY: "UPDATE_FACULTY",
  UPDATE_SECTOR: "UPDATE_SECTOR",
  VIEW_CARD: "VIEW_CARD",
} as const;

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ReducerState {
  state: ReactNode;
  size: ModalSize;
  data?: any;
}

type ModalActionsType = (typeof ModalActions)[keyof typeof ModalActions];

export type ActionType = {
  type: ModalActionsType;
  payload?: any;
};

const initialState: ReducerState = {
  state: <></>,
  size: "xs",
  data: null,
};

const ModalProvider = ({ children }: ReactNodeChildren) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const reducer = (state: ReducerState, action: ActionType): ReducerState => {
    switch (action.type) {
      case "ADD_ACADEMIC_YEAR":
        return { ...state, state: <CreateAcademicYearModal />, size: "sm" };
      case "ADD_FACULTY":
        return { ...state, state: <CreateFacultyModal />, size: "sm" };
      case "ADD_SECTOR":
        return { ...state, state: <CreateSectorModal />, size: "sm" };
      case "ADD_AGENT":
        return { ...state, state: <CreateAgentModal />, size: "sm" };
      case "UPDATE_FACULTY":
        return { ...state, state: <CreateFacultyModal />, size: "sm" };
      case "UPDATE_SECTOR":
        return { ...state, state: <CreateSectorModal />, size: "sm" };
      case "DELETE_CONFIRMATION":
        return { ...state, state: <DeleteConfirmationModal />, size: "xs" };
      case "EXPORT_CARDS":
        return { ...state, state: <ExportCardsModal />, size: "sm" };
      case "VIEW_CARD":
        return {
          ...state,
          state: <ViewCardToExportModal />,
          size: "md",
          data: action.payload,
        };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value: ModalContextType = {
    open,
    setOpen,
    handleOpen,
    state,
    dispatch,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <DialogContainer />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
