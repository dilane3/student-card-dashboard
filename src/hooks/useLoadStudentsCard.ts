import { findStudentsWithPagination, getFilteredStudentCards } from "@/api/students";
import Card, { CardStatusesType } from "@/entities/studentCard.entity";
import { AuthState } from "@/gx/signals/auth.signal";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { SectorsOperations, SectorsState } from "@/gx/signals/sectors.signal";
import { StudentCardActions, StudentCardState } from "@/gx/signals/students.signal";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoadStudentsCards(
  cardsStatus: CardStatusesType | "ALL" = "ALL",
) {
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
  }, [user, cardsStatus]);

  // Handlers
  const handleLoadStudentsCards = async () => {
    const { data } = await findStudentsWithPagination(cardsStatus);

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
          academicYear: new Date(Date.now()).getFullYear(),
          sector: sector?.name,
          faculty: faculty?.name,
        });
      });

      loadCards({ data: cards, hasMore, count });
    } else {
      toast.error("Failed to load student's cards");
    }
  };

  return {
    loading,
  };
}

export function useLoadConfiguratedStudentsCards(startDate: Date, endDate: Date) {
  // Global state
  const { sector } = useSignal<SectorsState>("sectors");
  const { user } = useSignal<AuthState>("auth");
  const { loading } = useSignal<StudentCardState>("students");

  // Global actions
  const { loadPdfCards } = useActions<StudentCardActions>("students");

  // Operations
  const { getFaculty } = useOperations<FacultiesOperations>("faculties");
  const { getSector } = useOperations<SectorsOperations>("sectors");

  useEffect(() => {
    (async () => {
      if (user && sector) {
        await handleFetchConfiguratedCards(sector.id);
      }
    })();
  }, [sector, startDate, endDate]);

  // Handlers
  const handleFetchConfiguratedCards = async (sectorId: string) => {
    const { data } = await getFilteredStudentCards(sectorId, startDate, endDate);

    if (data) {
      const { data: cardsData, hasMore, count } = data;

      const cards: Card[] = cardsData.map((card: any) => {
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
          academicYear: new Date(Date.now()).getFullYear(),
          sector: sector?.name,
          faculty: faculty?.name,
        });
      });

      loadPdfCards({ data: cards, hasMore, count });
    } else {
      toast.error("Failed to load student's cards");
    }
  };

  return {
    loading,
  };
}
