import { createFaculty, updateFaculty } from "@/api/faculty";
import { ModalContext } from "@/context/modalContext";
import { Faculty } from "@/entities/faculty.entity";
import { FacultiesActions, FacultiesState } from "@/gx/signals/faculties.signal";
import { useActions, useSignal } from "@dilane3/gx";
import {
  Button,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateFacultyModal = () => {
  const { handleOpen } = useContext(ModalContext);

  // Global actions
  const { addFaculty, updateFaculty: patchFaculty } = useActions<FacultiesActions>("faculties");
  const { faculty } = useSignal<FacultiesState>("faculties");

  // Actions
  const { selectFaculty } = useActions("faculties");

  // Local state
  const [name, setName] = useState(faculty?.name || "");
  const [loading, setLoading] = useState(false);

  // Effect 
  useEffect(()=>{
    if (faculty !== undefined) {
      setName(faculty?.name)
    }
  }, [faculty])

  // Handlers
  const handleNameChange = (e: any) => setName(e.target.value);

  const handleCloseModal = () => {
    selectFaculty(undefined);
    handleOpen();
  }

  const handleSubmit = async () => {

    if (!name) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    if (faculty !== undefined) {
      const { data } = await updateFaculty(faculty.id, {
        name: name
      });
  
      if (data) {
        const faculty = new Faculty(data);
  
        patchFaculty(faculty);
  
        toast.success("Faculty successfully updated");
        handleOpen();
      } else {
        toast.error("Something went wrong");
      }
      
    } else {
  
      const { data } = await createFaculty({ name });
  
      if (data) {
        const faculty = new Faculty(data);
  
        addFaculty(faculty);
  
        toast.success("Faculty created successfully");
        handleOpen();
      } else {
        toast.error("Something went wrong");
      }
    }

  };

  return (
    <Card className="w-full">
      <Typography
        type="h2"
        className="uppercase text-2xl text-center mt-8 text-primary font-bold"
      >
        Add a new faculty
      </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input
          crossOrigin={null}
          label="Name"
          size="lg"
          value={name}
          onChange={handleNameChange}
        />
      </CardBody>
      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="filled"
          className="bg-gray-400 uppercase"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          className="bg-primary uppercase"
          onClick={handleSubmit}
        >
          {
            loading ? "Loading..." : (faculty !== undefined ? "Update" : "Add")
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateFacultyModal;
