import { ModalContext } from '@/context/modalContext'
import { deleteFaculty } from '@/api/faculty';
import { FacultiesActions, FacultiesState } from '@/gx/signals/faculties.signal';
import { useActions, useSignal } from '@dilane3/gx';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { toast } from "react-toastify";
import { Faculty } from '@/entities/faculty.entity';

const DeleteConfirmationModal = () => {
    const {handleOpen} = useContext(ModalContext);

    // local state
    const [loading, setLoading] = useState(false);

    // Global actions
    const { deleteFaculty: removeFaculty } = useActions<FacultiesActions>("faculties");
    const { faculties, faculty } = useSignal<FacultiesState>("faculties");

    // handlers
    const handleSubmit = async () => {
        
        setLoading(true);
        if (faculty !== undefined) {
            
            const { data } = await deleteFaculty(faculty.id);
            if (data) {
                
                removeFaculty(faculty);
                toast.success("Faculty successfully removed");
                handleOpen();
            }
        } else {
            toast.error("Something went wrong");
        }
    }

  return (
    <Card className="w-full px-2">
        <Typography type="h2" className="uppercase text-2xl text-center mt-8 text-primary font-bold">
            Confirmer la suppression
        </Typography>
        <CardBody className="flex text-center flex-col gap-4">
        <Typography className='text-lg'>Êtes vous sur de vouloir supprimer cette resource ?</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
        <Button variant="filled" className="bg-gray-400 uppercase font-bold" onClick={handleOpen}>
            <Typography className='font-semibold text-base'>
                Annuler
            </Typography>
        </Button>
        <Button variant="filled" className="bg-red-700 uppercase font-bold" onClick={handleSubmit}>
            <Typography className='font-semibold text-base'>
            Valider
            </Typography>
        </Button>
        </CardFooter>
    </Card>
  )
}

export default DeleteConfirmationModal