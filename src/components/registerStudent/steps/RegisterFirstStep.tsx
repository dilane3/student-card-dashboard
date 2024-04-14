import { getStudentByMatricule } from "@/api/students";
import FormSummaryItem from "@/components/molecules/FormSummaryItem";
import Card from "@/entities/studentCard.entity";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { SectorsOperations } from "@/gx/signals/sectors.signal";
import {
  CompletionFirstStepInputSchema,
  StudentsCompletionFormActions,
  StudentsCompletionFormState,
} from "@/gx/signals/studentsCompletionForm.signal";
import { formatDateBySlash } from "@/utils";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const RegisterFirstStep = () => {
  // Local state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { setValue, control, watch } = useForm<CompletionFirstStepInputSchema>();

  // Global actions
  const { setForm } = useActions<StudentsCompletionFormActions>(
    "students-completion-form",
  );

  // Global state
  const { form } = useSignal<StudentsCompletionFormState>(
    "students-completion-form",
  );

  const { getFaculty } = useOperations<FacultiesOperations>("faculties");
  const { getSector } = useOperations<SectorsOperations>("sectors");

  const matricule = watch("matricule");
  const card = watch("card");

  // Effects

  // Set Default values when the component load for the first time
  useEffect(() => {
    (() => {
      const { matricule, card } = form.step1;

      setValue("matricule", matricule);
      setValue("card", card);
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

    const { data } = await getStudentByMatricule(matricule);

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
        avatar: data.avator,
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

      setValue("card", fetchedCard);
      setForm({
        matricule,
        card: fetchedCard,
      });
    } else {
      setError(true);
      console.error("loading failed");
    }
  };

  const handleResetStep = () => {
    // Reset form
    setError(false);
    setValue("matricule", "");
    setValue("card", undefined);
    setForm({
      matricule: "",
      card: undefined,
    });
  };

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Find Student / Rechercher l'étudiant
      </Typography>
      <div className="mt-8">
        <div className="flex">
          <Controller
            name="matricule"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Matricule"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {card && (
            <div className="bg-green-500 px-2 rounded-lg ml-2 flex justify-center items-center">
              <CheckIcon className="w-6 text-white" />
            </div>
          )}
          {error && (
            <div className="bg-red-500 px-2 rounded-lg ml-2 flex justify-center items-center">
              <XMarkIcon className="w-6 text-white" />
            </div>
          )}
        </div>
        {card && (
          <div className="mt-8 flex flex-col-reverse md:flex-row w-full gap-4">
            <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
              <FormSummaryItem label="Full Name" value={card.name} />
              <FormSummaryItem label="Sex" value={card.sex} />
              <FormSummaryItem label="Birth place" value={card.birthPlace} />
              <FormSummaryItem
                label="Birth date"
                value={formatDateBySlash(card.birthDate)}
              />
            </div>
            <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
              <FormSummaryItem label="Faculty" value={card.faculty} />
              <FormSummaryItem label="Academic sector" value={card.sector} />
              <FormSummaryItem label="Nationality" value={card.nationality} />
            </div>
          </div>
        )}
        <div>
          <Button
            variant="filled"
            className="mt-4 bg-gray-500 text-gray-300 mr-2"
            onClick={handleResetStep}
          >
            Clear
          </Button>
          <Button
            variant="filled"
            className="mt-4 bg-primary text-white"
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
