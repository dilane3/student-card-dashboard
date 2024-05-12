import FormSummaryItem from "@/components/molecules/FormSummaryItem";
import { StudentsCompletionFormState } from "@/gx/signals/studentsCompletionForm.signal";
import { formatDateBySlash } from "@/utils";
import { useSignal } from "@dilane3/gx";
import { Typography } from "@material-tailwind/react";

const RegisterThirdStep = () => {
  // Global state
  const {
    form: { step1, step2 },
    card: fetchedCard,
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
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-3">
          <FormSummaryItem label="Full Name" value={fetchedCard?.name} />
          <FormSummaryItem label="Sex" value={fetchedCard?.sex} />
          <FormSummaryItem label="Matricule" value={fetchedCard?.matricule} />
          <FormSummaryItem
            label="Birth date"
            value={formatDateBySlash(fetchedCard!.birthDate)}
          />
          <FormSummaryItem label="Birth place" value={fetchedCard?.birthPlace} />
          <FormSummaryItem label="Academic sector" value={fetchedCard?.sector} />
        </div>
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-3">
          <FormSummaryItem label="Nationality" value={fetchedCard?.nationality} />
          <FormSummaryItem label="Email" value={step2.email ?? fetchedCard?.email} />
          <FormSummaryItem label="Phone" value={step2.phone ?? fetchedCard?.phone} />

          <div>
            {!fetchedCard?.avatar && !step2.photo ? null : (
              <img
                src={
                  !fetchedCard?.avatar
                    ? step2.photo
                      ? displayPhoto(step2.photo)
                      : ""
                    : fetchedCard?.avatarLink
                }
                alt="student"
                className="w-32 h-32 rounded-md object-cover"
              />
            )}
            <p className="line-clamp-1 text-base font-nunitoRegular">
              <span className="font-nunitoBold text-lg">Photo: </span>{" "}
              <span>
                {!fetchedCard?.avatar
                  ? step2.photo
                    ? step2.photo.name
                    : " Empty"
                  : fetchedCard.avatar}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterThirdStep;
