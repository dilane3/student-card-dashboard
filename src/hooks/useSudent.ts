import { useEffect } from "react";
import { getStudent } from "@/api/students";

export default function useStudent(studentId:string) {
  useEffect(() => {
    (async () => {
        const { data } = await getStudent(studentId);
    
        if (data) {
            console.log("************test *****************");
    
            console.log(data);
    
        } else {
          console.error("loading failed");
        }
      })();
  }, []);

  const handleGetStudent = async () => {
    const { data } = await getStudent(studentId);

    if (data) {
        console.log("************test *****************");

        console.log(data);

    } else {
      console.error("loading failed");
    }
  };
}