import Card from "@/entities/studentCard.entity";
import { createSignal } from "@dilane3/gx";

export type StudentCardState = {
  cards: Card[];
  selectedCardId?: string;
  loading: boolean;
  hasMore: boolean;
  count: number;
}

export type StudentCardActions = {
  loadCards: (payload: { data: Card[], hasMore: boolean }) => void;
  addCard: (payload: Card) => void;
  addCards: (payload: { data: Card[], hasMore: boolean }) => void;
  setLoading: (payload: boolean) => void;
}

export type StudentCardOperations = {
  getCard: (id: string) => Card | undefined;
}

export default createSignal<StudentCardState>({
  name: "students",
  state: {
    cards: [],
    selectedCardId: undefined,
    loading: false,
    hasMore: true,
    count: 0,
  },
  actions: {
    loadCards: (state, payload: { data: Card[], hasMore: boolean }) => ({
      ...state,
      cards: payload.data,
      hasMore: payload.hasMore,
      count: payload.data.length,
      loading: false
    }),

    addCard: (state, payload: Card) => ({
      ...state,
      cards: [payload, ...state.cards],
      count: state.count + 1,
      selectedCardId: payload.id,
    }),

    addCards: (state, payload: { data: Card[], hasMore: boolean }) => ({
      ...state,
      cards: [...state.cards, ...payload.data],
      hasMore: payload.hasMore,
      count: state.count + payload.data.length,
    }),

    setLoading: (state, payload: boolean) => ({
      ...state,
      loading: payload,
    })
  },

  operations: {
    getCard: (state, id: string) => state.cards.find((card) => card.id === id),
  }
})