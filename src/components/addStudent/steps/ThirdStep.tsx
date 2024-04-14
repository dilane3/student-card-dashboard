import FormSummaryItem from "@/components/molecules/FormSummaryItem";
import { StudentsCardFormState } from "@/gx/signals/studentsCardForm.signal";
import { useSignal } from "@dilane3/gx";
import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import avatar from "@/assets/img/user.png";

const ThirdStep = () => {
  // Global state
  const {
    form: { step1, step2 },
  } = useSignal<StudentsCardFormState>("students-card-form");

  // Memoized values
  const sector = useMemo(() => {
    if (step1.sector) return JSON.parse(step1.sector).name;
    return "";
  }, [step1.sector]);

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
          <FormSummaryItem label="Full Name" value={step1.name} />
          <FormSummaryItem label="Sex" value={step1.sex} />
          <FormSummaryItem label="Matricule" value={step1.matricule} />
          <FormSummaryItem label="Birth date" value={step1.birthDate} />
          <FormSummaryItem label="Birth place" value={step1.birthPlace} />
          <FormSummaryItem label="Academic sector" value={sector} />
          <FormSummaryItem label="Payment Status" value={step2.paymentStatus} />
        </div>
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <div>
            <img
              src={displayPhoto(step2.photo)}
              alt="student"
              className="w-32 h-32 rounded-full object-cover"
              onError={(e) => (e.currentTarget.src = avatar)}
            />
            {!step2.photo && (
              <p className="text-lg font-nunitoRegular capitalize">Empty</p>
            )}
          </div>

          <FormSummaryItem label="Nationality" value={step2.nationality} />
          <FormSummaryItem label="Email" value={step2.email} />
          <FormSummaryItem label="Phone" value={step2.phone} />
        </div>
      </div>
    </>
  );
};
export default ThirdStep;
