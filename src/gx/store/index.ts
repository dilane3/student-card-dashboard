import { createStore } from "@dilane3/gx";
import facultiesSginal from "../signals/faculties.signal";
import authSignal from "../signals/auth.signal";
import sectorsSignal from "../signals/sectors.signal";
import agentsSignal from "../signals/agents.signal";
import studentsCardFormSignal from "../signals/studentsCardForm.signal";
import studentsSignal from "../signals/students.signal";

const store = createStore([
  facultiesSginal,
  authSignal,
  sectorsSignal,
  agentsSignal,
  studentsCardFormSignal,
  studentsSignal,
]);

export default store;
