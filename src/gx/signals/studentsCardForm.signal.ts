import { Sector } from "@/entities/sector.entity";
import { createSignal } from "@dilane3/gx";

export type FirstStepInputSchema = {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  birthPlace: string;
  matricule: string;
  sector: string;
};

export type SecondStepInputSchema = {
  nationality: string;
  email: string;
  phone: string;
  photo: File | undefined;
};

export type StudentsCardFormState = {
  form: {
    step1: FirstStepInputSchema;
    step2: SecondStepInputSchema;
  };
  step: number;
  complete: boolean;
  loading: boolean;
};

export type StudentsCardFormActions = {
  setForm: (payload: { [key: string]: any }) => void;
  setComplete: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setNext: () => void;
  setPrev: () => void;
  setActive: (payload: number) => void;
  reset: () => void;
};

export default createSignal<StudentsCardFormState>({
  name: "students-card-form",
  state: {
    form: {
      step1: {
        firstName: "",
        lastName: "",
        sex: "",
        birthDate: "",
        birthPlace: "",
        matricule: "",
        sector: "",
      },
      step2: {
        nationality: "",
        email: "",
        phone: "",
        photo: undefined,
      },
    },
    step: 0,
    complete: false,
    loading: false,
  },
  actions: {
    setForm: (state, payload: FirstStepInputSchema | SecondStepInputSchema) => {
      if (state.step === 0) {
        return {
          ...state,
          form: {
            ...state.form,
            step1: payload as FirstStepInputSchema,
          },
        };
      } else if (state.step === 1) {
        return {
          ...state,
          form: {
            ...state.form,
            step2: payload as SecondStepInputSchema,
          },
        };
      }

      return state;
    },
    setComplete: (state, payload) => {
      return {
        ...state,
        complete: payload,
      };
    },
    setLoading: (state, payload) => {
      return {
        ...state,
        loading: payload,
      };
    },
    setNext: (state) => {
      return {
        ...state,
        step: state.step + 1,
      };
    },
    setPrev: (state) => {
      return {
        ...state,
        step: state.step - 1,
      };
    },
    setActive: (state, payload) => {
      return {
        ...state,
        step: payload,
      };
    },
    reset: (state) => {
      return {
        ...state,
        form: {
          step1: {
            firstName: "",
            lastName: "",
            sex: "",
            birthDate: "",
            birthPlace: "",
            matricule: "",
            sector: "",
          },
          step2: { nationality: "", email: "", phone: "", photo: undefined },
        },
        step: 0,
        complete: false,
        loading: false,
      };
    },
  },
});
