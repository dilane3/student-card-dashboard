import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateStudentDto = {
  sectorId: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sexe: "MALE" | "FEMALE";
  avatar: string;
  birthDate: Date;
  nationality: string;
};
type UpdateStudentDto = null;

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

export async function findStudentsWithPagination(offset = 0, limit = 20) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/student-cards", config);

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
      console.log(response.data);

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
