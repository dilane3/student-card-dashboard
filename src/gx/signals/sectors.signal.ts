import { Sector } from "@/entities/sector.entity";
import { createSignal } from "@dilane3/gx";

export type SectorsState = {
  sectors: Sector[];
  sector: Sector | undefined;
  loading: boolean;
};

export type SectorsActions = {
  loadSectors: (sectors: Sector[]) => void;
  addSector: (sector: Sector) => void;
  selectSector: (sector: Sector) => void;
  updateSector: (sector: Sector) => void;
  deleteSector: (sector: Sector) => void;
};

export type SectorsOperations = {
  getSector: (id: string) => Sector | undefined;
};

const sectorsSignal = createSignal<SectorsState>({
  name: "sectors",
  state: {
    sectors: [],
    sector: undefined,
    loading: false
  },
  actions: {
    loadSectors: (state, sectors: Sector[]) => {
      return {
        ...state,
        sectors,
        loading: false
      };
    },

    addSector: (state, sector: Sector) => {
      return {
        ...state,
        sectors: [...state.sectors, sector]
      };
    },

    selectSector: (state, sector: Sector) => {
      return {
        ...state,
        sector: sector
      }
    },  

    updateSector: (state, sector: Sector) => {
      return {
        ...state,
        sectors: state.sectors.map((s) => {
          if (s.id === sector.id) {
            return sector;
          }
          return s;
        })
      };
    },

    deleteSector: (state, sector: Sector) => {
      return {
        ...state,
        sectors: state.sectors.filter((s) => s.id !== sector.id)
      };
    }
  },

  operations: {
    getSector: (state, id: string) => {
      return state.sectors.find((s) => s.id === id);
    }
  }
});

export default sectorsSignal;