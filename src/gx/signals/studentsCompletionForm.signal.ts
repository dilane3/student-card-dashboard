import Card from "@/entities/studentCard.entity";
import { createSignal } from "@dilane3/gx";

export type CompletionFirstStepInputSchema = {
  matricule: string;
};

export type CompletionSecondStepInputSchema = {
  email: string;
  phone: string;
  photo: File | undefined;
};

export type StudentsCompletionFormState = {
  form: {
    step1: CompletionFirstStepInputSchema;
    step2: CompletionSecondStepInputSchema;
  };
  card?: Card;
  step: number;
  complete: boolean;
  loading: boolean;
};

export type StudentsCompletionFormActions = {
  setForm: (payload: { [key: string]: any }) => void;
  setComplete: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setNext: () => void;
  setPrev: () => void;
  setActive: (payload: number) => void;
  reset: () => void;
  setCard: (card: Card | undefined) => void;
};

export default createSignal<StudentsCompletionFormState>({
  name: "students-completion-form",
  state: {
    form: {
      step1: {
        matricule: "",
      },
      step2: {
        email: "",
        phone: "",
        photo: undefined,
      },
    },
    step: 0,
    card: undefined,
    complete: false,
    loading: false,
  },
  actions: {
    setForm: (
      state,
      payload: CompletionFirstStepInputSchema | CompletionSecondStepInputSchema,
    ) => {
      if (state.step === 0) {
        return {
          ...state,
          form: {
            ...state.form,
            step1: payload as CompletionFirstStepInputSchema,
          },
        };
      } else if (state.step === 1) {
        return {
          ...state,
          form: {
            ...state.form,
            step2: payload as CompletionSecondStepInputSchema,
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
    setCard: (state, payload: Card | undefined) => {
      return {
        ...state,
        card: payload,
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
            matricule: "",
          },
          step2: {
            email: "",
            phone: "",
            photo: undefined,
          },
        },
        step: 0,
        card: undefined,
        complete: false,
        loading: false,
      };
    },
  },
});
