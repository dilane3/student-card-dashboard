import { findAllFaculties, findFacultysWithPagination } from "@/api/faculty";
import { Faculty } from "@/entities/faculty.entity";
import { FacultiesState, FacultiesActions } from "@/gx/signals/faculties.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadFaculties() {
  // Global state
  const { loading } = useSignal<FacultiesState>("faculties");

  // Global actions
  const { loadFaculties } = useActions<FacultiesActions>("faculties");

  useEffect(() => {
    (async () => {
      if (!loading) {
        await handleLoadFaculties();
      }
    })();
  }, []);

  // Handlers
  const handleLoadFaculties = async () => {
    const { data } = await findAllFaculties();

    if (data) {
      const faculties = data.map((faculty: any) => {
        return new Faculty({
          id: faculty.id,
          name: faculty.name,
          createdAt: new Date(faculty.createdAt),
        });
      });

      loadFaculties(faculties);
    } else {
      toast.error("Failed to load faculties");
    }
  };
}

export function useLoadPaginatedFaculties({
  offset = 0,
  limit = 10,
  search = "",
}: {
  offset?: number;
  limit?: number;
  search?: string;
}) {
  // Global state
  const { loading } = useSignal<FacultiesState>("faculties");

  // Global actions
  const { loadPaginatedFaculties } = useActions<FacultiesActions>("faculties");

  useEffect(() => {
    (async () => {
      if (!loading) {
        console.log("Logo");
        await handleLoadFaculties();
      }
    })();
  }, [search]);

  // Handlers
  const handleLoadFaculties = async () => {
    const { data } = await findFacultysWithPagination(offset, limit, search);

    if (data) {
      const faculties = data.map((faculty: any) => {
        return new Faculty({
          id: faculty.id,
          name: faculty.name,
          createdAt: new Date(faculty.createdAt),
        });
      });

      loadPaginatedFaculties(faculties);
    } else {
      toast.error("Failed to load faculties");
    }
  };
}
