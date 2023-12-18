import { findAllFaculties } from "@/api/faculty";
import { findStudentsWithPagination } from "@/api/students";
import { Faculty } from "@/entities/faculty.entity";
import Card from "@/entities/studentCard.entity";
import { AuthState } from "@/gx/signals/auth.signal";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { SectorsOperations } from "@/gx/signals/sectors.signal";
import { StudentCardActions, StudentCardState } from "@/gx/signals/students.signal";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadStudentsCards() {
  // Global state
  const { user } = useSignal<AuthState>("auth");
  const { loading } = useSignal<StudentCardState>("students");

  // Global actions
  const { loadCards } = useActions<StudentCardActions>("students");

  // Operations
  const { getFaculty } = useOperations<FacultiesOperations>("faculties");
  const { getSector } = useOperations<SectorsOperations>("sectors");

  useEffect(() => {
    (async () => {
      if (user && !loading) {
        await handleLoadStudentsCards();
      }
    })();
  }, [user]);

  // Handlers
  const handleLoadStudentsCards = async () => {
    const { data } = await findStudentsWithPagination();

    if (data) {
      const { data: cardsData, hasMore, count } = data;

      const cards = cardsData.map((card: any) => {
        // Get academic year

        // Get sector and faculty
        const sector = getSector(card.sectorId);
        const faculty = getFaculty(sector?.idFaculty || "");

        return new Card({
          ...card,
          birthDate: new Date(card.birthDate),
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
          sex: card.sexe,
          academicYear: 2023,
          sector: sector?.name,
          faculty: faculty?.name,
        });
      });

      console.log(cards)

      loadCards({ data: cards, hasMore, count });
    } else {
      toast.error("Failed to load student's cards");
    }
  };
}
