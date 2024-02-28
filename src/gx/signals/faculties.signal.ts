import { Faculty } from "@/entities/faculty.entity";
import { createSignal } from "@dilane3/gx";

export type FacultiesState = {
  faculties: Faculty[];
  faculty: Faculty | undefined;
  loading: boolean;
};

export type FacultiesActions = {
  loadFaculties: (faculties: Faculty[]) => void;
  addFaculty: (faculty: Faculty) => void;
  selectFaculty: (faculty: Faculty) => void;
  updateFaculty: (faculty: Faculty) => void;
  deleteFaculty: (faculty: Faculty) => void;
};

export type FacultiesOperations = {
  getFaculty: (id: string) => Faculty | undefined;
};

const facultiesSignal = createSignal<FacultiesState>({
  name: "faculties",
  state: {
    faculties: [],
    faculty: undefined,
    loading: false
  },
  actions: {
    loadFaculties: (state, faculties: Faculty[]) => {
      return {
        ...state,
        faculties,
        loading: false
      };
    },

    selectFaculty: (state, faculty: Faculty | undefined) => {
      return {
        ...state,
        faculty: faculty
      }
    }, 

    addFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: [...state.faculties, faculty]
      };
    },

    updateFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: state.faculties.map((f) => {
          if (f.id === faculty.id) {
            return faculty;
          }
          return f;
        })
      };
    },

    deleteFaculty: (state, faculty: Faculty) => {
      return {
        ...state,
        faculties: state.faculties.filter((f) => f.id !== faculty.id)
      };
    }
  },

  operations: {
    getFaculty: (state, id: string) => state.faculties.find((faculty) => faculty.id === id),
  }
});

export default facultiesSignal;