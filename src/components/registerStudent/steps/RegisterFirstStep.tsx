import { getStudentByMatricule } from "@/api/students";
import Card from "@/entities/studentCard.entity";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { SectorsOperations } from "@/gx/signals/sectors.signal";
import {
  CompletionFirstStepInputSchema,
  StudentsCompletionFormActions,
  StudentsCompletionFormState,
} from "@/gx/signals/studentsCompletionForm.signal";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterFirstStep = () => {
  // Local state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { setValue, control, watch } = useForm<CompletionFirstStepInputSchema>();

  // Global actions
  const { setForm, setCard } = useActions<StudentsCompletionFormActions>(
    "students-completion-form",
  );

  // Global state
  const { form, card } = useSignal<StudentsCompletionFormState>(
    "students-completion-form",
  );

  const { getFaculty } = useOperations<FacultiesOperations>("faculties");
  const { getSector } = useOperations<SectorsOperations>("sectors");

  const matricule = watch("matricule");

  // Effects

  // Set Default values when the component load for the first time
  useEffect(() => {
    (() => {
      const { matricule } = form.step1;

      setValue("matricule", matricule);
      setCard(card);
    })();
  }, []);

  // Update the form values state when the user modifies the form
  useEffect(() => {
    handleSetForm();
  }, [matricule, card]);

  // Handlers
  const handleSetForm = () => {
    setForm({
      matricule,
      card,
    });
  };

  const handleGetStudent = async () => {
    setLoading(true);
    setError(false);

    const { data, message } = await getStudentByMatricule(matricule);

    setLoading(false);

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

      setCard(fetchedCard);
      setForm({
        matricule,
        card: fetchedCard,
      });
    } else {
      setError(true);
      toast(message);
      console.error("loading failed");
    }
  };

  const handleResetStep = () => {
    // Reset form
    setError(false);
    setValue("matricule", "");
    setCard(undefined);
    setForm({
      matricule: "",
      card: undefined,
    });
  };

  const handleGetNoDataPresent = useCallback(() => {
    if (!card?.email || !card.avatar || !card.phone) {
      return <>This are the datas you lack:</>;
    } else {
      return <>Your account is already completed</>;
    }
  }, [card]);

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Find Student / Rechercher l'étudiant
      </Typography>
      <div className="mt-4 space-y-6">
        <Controller
          name="matricule"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <div className="relative w-full">
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Matricule"
                value={value}
                onChange={onChange}
              />
              {card && (
                <div className="bg-green-500 w-[5%] h-[80%] -translate-y-1/2 absolute top-1/2 right-1 px-2 rounded-md flex justify-center items-center">
                  <CheckIcon className="w-6 text-white" />
                </div>
              )}
              {error && (
                <div className="bg-red-500 w-[5%] h-[80%] -translate-y-1/2 absolute top-1/2 right-1 px-2 rounded-lg flex justify-center items-center">
                  <XMarkIcon className="w-6 text-white" />
                </div>
              )}
            </div>
          )}
        />
        {card && (
          <div className="mt-2 flex flex-col-reverse md:flex-row w-full gap-4">
            <div className="mb-4 space-y-4">
              <p className="text-lg">
                Great you are present in the system. {handleGetNoDataPresent()}
              </p>
              <div>
                <ul className="list-decimal ml-4">
                  {!card.email && <li>Email</li>}
                  {!card.phone && <li>Phone</li>}
                  {!card.avatar && <li>Photo</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="space-x-2">
          <Button
            variant="filled"
            className="bg-gray-600 text-white"
            onClick={handleResetStep}
          >
            Clear
          </Button>
          <Button
            variant="filled"
            disabled={card !== undefined}
            className="bg-primary text-white"
            onClick={handleGetStudent}
          >
            {loading ? "Loading..." : "Find"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterFirstStep;
