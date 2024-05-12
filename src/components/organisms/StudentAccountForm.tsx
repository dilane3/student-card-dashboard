import { useCallback, useMemo, useState } from "react";
import {
  StudentsCompletionFormActions,
  StudentsCompletionFormState,
} from "@/gx/signals/studentsCompletionForm.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import formRegistrationImg from "@/assets/img/registrationDone.png";
import { ShieldCheckIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import { updateStudent } from "@/api/students";
import { isValidEmail, isValidPhoneNumber } from "@/utils";
import { toast } from "react-toastify";
import { uploadFile } from "@/api/upload";
import RegisterFirstStep from "../registerStudent/steps/RegisterFirstStep";
import RegisterSecondStep from "../registerStudent/steps/RegisterSecondStep";
import RegisterThirdStep from "../registerStudent/steps/RegisterThirdStep";

const StudentAccountForm = () => {
  // Local state
  const [loading, setLoading] = useState(false);

  // Global state
  const {
    form,
    step: activeStep,
    card: fetchedCard,
    complete,
  } = useSignal<StudentsCompletionFormState>("students-completion-form");

  // Global actions
  const { setNext, setPrev, setActive, setComplete } =
    useActions<StudentsCompletionFormActions>("students-completion-form");

  // Memoized values
  const isLastStep = useMemo(() => activeStep === 2, [activeStep]);
  const isFirstStep = useMemo(() => activeStep === 0, [activeStep]);
  const isVerified = useCallback(
    (step = activeStep) => {
      if (!fetchedCard) return false;
      switch (step) {
        case 0: {
          const { matricule } = form.step1;

          if (fetchedCard.email && fetchedCard.avatar && fetchedCard.phone)
            return false;

          if (matricule && fetchedCard) {
            return true;
          }

          return false;
        }

        case 1: {
          const { email, photo, phone } = form.step2;

          return (
            (!fetchedCard.email ? (!email ? false : isValidEmail(email)) : true) &&
            (!fetchedCard.phone
              ? !phone
                ? false
                : isValidPhoneNumber(phone)
              : true)
            // &&
            // (!fetchedCard.avatar ? (!photo ? false : true) : true)
          );
        }

        default:
          return false;
      }
    },
    [JSON.stringify(form)],
  );

  // Handlers

  /**
   * Goes to the next step of the stepper or validates the form
   * @returns
   */
  const handleNext = async () => {
    if (!fetchedCard) return;
    if (isVerified()) {
      if (isLastStep) {
        // Submit form
        setLoading(true);
        toast.info("Uploading photo...");
        // Uploading photo
        const formData = new FormData();

        let photoFile: { fileName: string } | undefined = undefined;

        if (form.step2.photo) {
          toast.info("Uploading photo...");

          formData.append("file", form.step2.photo as any);

          const { data } = await uploadFile(formData);

          if (!data) {
            toast.error("Error while uploading photo");
          }
          photoFile = data;
        }

        toast.info("Submitting form...");

        const payload = {
          email: form.step2.email,
          phone: form.step2.phone,
          avatar: photoFile?.fileName,
        };
        const { data: cardData } = await updateStudent(fetchedCard.id, payload);
        if (cardData) {
          toast.success("Student card submitted successfully");
          setComplete(true);
        } else {
          toast.error("Error while submitting the student card");
        }

        setLoading(false);
      } else {
        setNext();
      }
    }
  };

  /**
   * Go to previous step
   * @returns
   */
  const handlePrev = () => {
    if (isFirstStep) return;

    setPrev();
  };

  /**
   * Set active step
   */
  const handleSetActive = (step: number) => {
    if (isVerified(step)) {
      setActive(step);
    }
  };
  /**
   * Display form steps
   */
  const displayFormStep = (): JSX.Element => {
    switch (activeStep) {
      case 0:
        return <RegisterFirstStep />;

      case 1:
        return <RegisterSecondStep />;

      case 2:
        return <RegisterThirdStep />;

      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="w-full p-4 md:py-4 md:px-8">
        {!complete ? (
          <>
            <Stepper
              lineClassName="h-2"
              activeLineClassName="bg-purple-700"
              activeStep={activeStep}
            >
              <Step
                color="purple"
                activeClassName="bg-purple-700"
                completedClassName="bg-purple-700"
                className="h-16 w-16"
                onClick={() => handleSetActive(0)}
              >
                <UserIcon className="w-5" />
              </Step>
              <Step
                activeClassName="bg-purple-700"
                completedClassName="bg-purple-700"
                className="h-16 w-16"
                onClick={() => handleSetActive(1)}
              >
                <UsersIcon className="w-5" />
              </Step>
              <Step
                activeClassName="bg-purple-700"
                completedClassName="bg-purple-700"
                className="h-16 w-16"
                onClick={() => handleSetActive(2)}
              >
                <ShieldCheckIcon className="w-5" />
              </Step>
            </Stepper>
            <form className="w-full">{displayFormStep()}</form>
            <div
              className={`mt-8 flex ${
                activeStep === 0 ? "w-full justify-end" : "justify-between"
              }`}
            >
              {activeStep > 0 && (
                <Button
                  className="bg-purple-700"
                  onClick={handlePrev}
                  disabled={isFirstStep}
                >
                  Prev
                </Button>
              )}
              <Button
                className="bg-purple-700"
                onClick={handleNext}
                disabled={!isVerified()}
              >
                {activeStep === 2 ? (loading ? "Loading..." : "Valider") : "Next"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center md:h-[400px]">
            <img src={formRegistrationImg} width={200} />
            <Typography>All informations have been saved properly</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentAccountForm;
