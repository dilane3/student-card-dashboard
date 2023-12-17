import { createSignal } from "@dilane3/gx";

export type StudentsCardFormState = {
  form: {
    step1: { [key: string]: any };
    step2: { [key: string]: any };
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
      step1: {},
      step2: {},
    },
    step: 0,
    complete: false,
    loading: false,
  },
  actions: {
    setForm: (state, payload: { [key: string]: any }) => {
      if (state.step === 0) {
        return {
          ...state,
          form: {
            ...state.form,
            step1: payload,
          },
        };
      } else if (state.step === 1) {
        return {
          ...state,
          form: {
            ...state.form,
            step2: payload,
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
          step1: {},
          step2: {},
        },
        step: 0,
        complete: false,
        loading: false,
      };
    },
  },
});
