import { useEffect, useState } from "react";
import { getStudent, getStudentCardStatistics } from "@/api/students";
import { useActions, useOperations } from "@dilane3/gx";
import { StudentCardActions } from "@/gx/signals/students.signal";
import Card from "@/entities/studentCard.entity";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { SectorsOperations } from "@/gx/signals/sectors.signal";

export default function useStudent(studentId: string) {
  const { loadCard } = useActions<StudentCardActions>("students");

  // Operations
  const { getFaculty } = useOperations<FacultiesOperations>("faculties");
  const { getSector } = useOperations<SectorsOperations>("sectors");

  useEffect(() => {
    (async () => {
      await handleGetStudent();
    })();
  }, []);

  const handleGetStudent = async () => {
    const { data } = await getStudent(studentId);

    if (data) {
      const sector = getSector(data.sectorId);

      const faculty = getFaculty(sector?.idFaculty ?? "");

      const fetchedCard = new Card({
        id: data.id,
        matricule: data.matricule,
        code: data.code,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
        sex: data.sexe,
        status: data.status,
        birthDate: new Date(Date.parse(data.birthDate)),
        birthPlace: data.birthPlace,
        nationality: data.nationality,
        paymentStatus: data.paymentStatus,
        createdAt: new Date(Date.parse(data.createdAt)),
        updatedAt: new Date(Date.parse(data.updatedAt)),
        academicYear: new Date(Date.now()).getFullYear(),
        sector: sector?.name ?? "",
        faculty: faculty?.name ?? "",
      });

      loadCard({ data: fetchedCard });
    } else {
      console.error("loading failed");
    }
  };
}

export function useStudentCardsStatistics() {
  const { loadCard } = useActions<StudentCardActions>("students");

  const [cardsStatistics, setCardsStatistics] = useState<{
    studentsCount: number;
    maleStudentsCount: number;
    femaleStudentsCount: number;
    totalPrintedCardsCount: number;
    totalValidatedCardsCount: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      await handleGetStudentCardsStatistics();
    })();
  }, []);

  const handleGetStudentCardsStatistics = async () => {
    const { data } = await getStudentCardStatistics();

    if (data) {
      setCardsStatistics({
        studentsCount: data.studentsCount,
        maleStudentsCount: data.maleStudentsCount,
        femaleStudentsCount: data.femaleStudentsCount,
        totalPrintedCardsCount: data.totalPrintedCardsCount,
        totalValidatedCardsCount: data.totalValidatedCardsCount,
      });
    }
  };

  return {
    cardsStatistics,
    loadCard,
  };
}
