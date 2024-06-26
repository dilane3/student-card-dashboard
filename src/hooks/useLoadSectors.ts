import { findAllSectors } from "@/api/sector";
import { Sector } from "@/entities/sector.entity";
import { SectorsActions, SectorsState } from "@/gx/signals/sectors.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadSectors() {
  // Global state
  const { loading } = useSignal<SectorsState>("sectors");

  // Global actions
  const { loadSectors } = useActions<SectorsActions>("sectors");

  useEffect(() => {
    (async () => {
      if (!loading) {
        await handleLoadSectors();
      }
    })();
  }, []);

  // Handlers
  const handleLoadSectors = async () => {
    const { data } = await findAllSectors();

    if (data) {
      const sectors = data.map((sector: any) => {
        return new Sector({
          id: sector.id,
          name: sector.name,
          longName: sector.longName,
          createdAt: new Date(sector.createdAt),
          idFaculty: sector.facultyId,
        });
      });

      loadSectors(sectors);
    } else {
      toast.error("Failed to load sectors");
    }
  };
}
