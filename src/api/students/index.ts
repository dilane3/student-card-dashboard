import { AxiosRequestConfig } from "axios";
import instance from "..";
import { CardStatusesType } from "@/entities/studentCard.entity";

type CreateStudentDto = {
  sectorId: string;
  matricule: string;
  name: string;
  email?: string;
  phone?: string;
  sexe: "MALE" | "FEMALE";
  avatar?: string;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  paymentStatus?: "FULL" | "HALF";
};
type UpdateStudentDto = {
  sectorId?: string;
  name?: string;
  matricule?: string;
  birthDate?: Date;
  birthPlace?: string;
  nationality?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  sexe?: "MALE" | "FEMALE";
  paymentStatus?: "FULL" | "HALF";
};

/**
 * This function creates student on the server.
 * @param payload DTO for creating student.
 */
export async function registerStudent(payload: CreateStudentDto) {
  try {
    const response = await instance.post("/student-cards", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating student.",
    };
  }
}

/**
 * This function update student on the server.
 * @param payload DTO for updating student.
 */
export async function updateStudent(id: string, payload: UpdateStudentDto) {
  try {
    const response = await instance.patch(`/student-cards/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating student.",
    };
  }
}

/**
 * This function loads students from the server.
 */
export async function findAllStudents() {
  try {
    const response = await instance.get("/student-cards");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading students.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading students.",
    };
  }
}

/**
 * Delete a student
 * @param id Id of the student to delete
 * @returns
 */
export async function deleteStudent(id: string) {
  try {
    const response = await instance.delete(`/student-cards/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting student.",
    };
  }
}

/**
 * This function loads paginated students from the server.
 */

export async function findStudentsWithPagination(
  cardsStatus: CardStatusesType | "ALL" = "ALL",
  offset = 0,
  limit = 20,
) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get(
      `/student-cards${
        cardsStatus !== "ALL" ? `/by-status?status=${cardsStatus}` : ""
      }`,
      config,
    );

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error loading students.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading students.",
    };
  }
}

/**
 * This function get by id a student on the server.
 *  @param id Id of the student to retrieve
 *
 */
export async function getStudent(id: string) {
  try {
    const response = await instance.get(`/student-cards/id/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting student.",
    };
  }
}

/**
 * This function get by id a student on the server.
 *  @param matricule Id of the student to retrieve
 *
 */
export async function getStudentByMatricule(matricule: string) {
  try {
    const response = await instance.get(`/student-cards/matricule/${matricule}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting student.",
    };
  }
}

/**
 * This function gets the necessary statistics about the students on the server.
 */
export async function getStudentCardStatistics() {
  try {
    const response = await instance.get(`/student-cards/statistics`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting student.",
    };
  }
}

/**
 * This function gets the .
 *  @param id Id of the student to retrieve
 *
 */

export async function getFilteredStudentCards(
  sectorId: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    const params = {
      startDate,
      endDate,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get(
      `/student-cards/unprinted/sector/${sectorId}`,
      config,
    );

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting student.",
    };
  }
}

/**
 * This function update student on the server.
 * @param payload DTO for updating student.
 */
export async function updateStudentCardStatus(
  cardId: string,
  status: CardStatusesType,
) {
  try {
    const response = await instance.patch(`/student-cards/${cardId}/status`, {
      status: status,
    });

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating student.",
    };
  }
}
