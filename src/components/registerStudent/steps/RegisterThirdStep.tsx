import FormSummaryItem from "@/components/molecules/FormSummaryItem";
import { StudentsCompletionFormState } from "@/gx/signals/studentsCompletionForm.signal";
import { formatDateBySlash } from "@/utils";
import { useSignal } from "@dilane3/gx";
import { Typography } from "@material-tailwind/react";

const RegisterThirdStep = () => {
  // Global state
  const {
    form: { step1, step2 },
  } = useSignal<StudentsCompletionFormState>("students-completion-form");

  const displayPhoto = (photo: File | undefined) => {
    if (photo) {
      return URL.createObjectURL(photo);
    }

    return "";
  };

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Summary Informations
      </Typography>

      <div className="mt-8 flex flex-col-reverse md:flex-row w-full gap-4">
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <FormSummaryItem label="Full Name" value={step1.card!.name} />
          <FormSummaryItem label="Sex" value={step1.card!.sex} />
          <FormSummaryItem label="Matricule" value={step1.card!.matricule} />
          <FormSummaryItem
            label="Birth date"
            value={formatDateBySlash(step1.card!.birthDate)}
          />
          <FormSummaryItem label="Birth place" value={step1.card!.birthPlace} />
          <FormSummaryItem label="Academic sector" value={step1.card!.sector} />
        </div>
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <div>
            <img
              src={displayPhoto(step2.photo)}
              alt="student"
              className="w-32 h-32 rounded-full object-cover"
            />
            {!step2.photo && (
              <p className="text-lg font-nunitoRegular capitalize">Empty</p>
            )}
          </div>

          <FormSummaryItem label="Nationality" value={step1.card!.nationality} />
          <FormSummaryItem label="Email" value={step2.email} />
          <FormSummaryItem label="Phone" value={step2.phone} />
        </div>
      </div>
    </>
  );
};

export default RegisterThirdStep;
