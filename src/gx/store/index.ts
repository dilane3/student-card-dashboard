import { createStore } from "@dilane3/gx";
import facultiesSginal from "../signals/faculties.signal";
import authSignal from "../signals/auth.signal";
import sectorsSignal from "../signals/sectors.signal";
import agentsSignal from "../signals/agents.signal";
import studentsCardFormSignal from "../signals/studentsCardForm.signal";

const store = createStore([
  facultiesSginal,
  authSignal,
  sectorsSignal,
  agentsSignal,
  studentsCardFormSignal,
]);

export default store;
