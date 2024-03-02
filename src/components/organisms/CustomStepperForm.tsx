import React, { useCallback, useMemo, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import FirstStep from "../addStudent/steps/FirstStep";
import { ShieldCheckIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import SecondStep from "../addStudent/steps/SecondStep";
import ThirdStep from "../addStudent/steps/ThirdStep";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import {
  StudentsCardFormActions,
  StudentsCardFormState,
} from "@/gx/signals/studentsCardForm.signal";
import { registerStudent } from "@/api/students";
import { uploadFile } from "@/api/upload";
import { toast } from "react-toastify";
import Card from "@/entities/studentCard.entity";
import { SectorsOperations } from "@/gx/signals/sectors.signal";
import { FacultiesOperations } from "@/gx/signals/faculties.signal";
import { StudentCardActions } from "@/gx/signals/students.signal";
import { useNavigate } from "react-router";
import formRegistrationImg from "@/assets/img/registrationDone.png";

type Props = {
  context?: "visitor" | "admin";
};

export function CustomStepperForm({ context = "visitor" }: Props) {
  // Navigation
  const navigate = useNavigate();

  // Local state
  const [loading, setLoading] = useState(false);

  // Global state
  const {
    form,
    step: activeStep,
    complete,
  } = useSignal<StudentsCardFormState>("students-card-form");

  // Global actions
  const {
    setNext,
    setPrev,
    setActive,
    reset: resetForm,
    setComplete,
  } = useActions<StudentsCardFormActions>("students-card-form");
  const { addCard } = useActions<StudentCardActions>("students");

  // Global operations
  const { getSector } = useOperations<SectorsOperations>("sectors");
  const { getFaculty } = useOperations<FacultiesOperations>("faculties");

  // Memoized values
  const isLastStep = useMemo(() => activeStep === 2, [activeStep]);
  const isFirstStep = useMemo(() => activeStep === 0, [activeStep]);
  const isVerified = useCallback(
    (step = activeStep) => {
      switch (step) {
        case 0: {
          const {
            firstName,
            lastName,
            sex,
            birthPlace,
            birthDate,
            matricule,
            sector,
          } = form.step1;

          if (
            firstName &&
            lastName &&
            sex &&
            birthDate &&
            birthPlace &&
            matricule &&
            sector
          ) {
            return true;
          }

          return false;
        }

        case 1: {
          const { nationality, email, phone, photo } = form.step2;

          if (nationality && email && phone && photo) return true;

          return false;
        }

        default:
          return false;
      }
    },
    [JSON.stringify(form)],
  );

  // Handlers

  const handleNext = async () => {
    if (isVerified()) {
      if (isLastStep) {
        // Submit form
        setLoading(true);

        toast.info("Uploading photo...");

        // Uploading photo
        const formData = new FormData();

        formData.append("file", form.step2.photo as any);

        const { data } = await uploadFile(formData);

        if (data) {
          toast.info("Submitting form...");

          const { fileName } = data;

          const payload = {
            ...form.step1,
            ...form.step2,
            sexe: form.step1.sex as "MALE" | "FEMALE",
            sectorId: JSON.parse(form.step1.sector).id,
            avatar: fileName,
            birthDate: new Date(form.step1.birthDate),
            sex: undefined,
            photo: undefined,
            sector: undefined,
          };

          console.log(payload)

          const { data: cardData, error } = await registerStudent(payload);

          console.log(error)

          if (cardData) {
            toast.success("Student card created successfully");

            // Get academic year

            // Get sector and faculty
            const sector = getSector(cardData.sectorId);
            const faculty = getFaculty(sector?.idFaculty || "");

            const card = new Card({
              ...cardData,
              birthDate: new Date(cardData.birthDate),
              createdAt: new Date(cardData.createdAt),
              updatedAt: new Date(cardData.updatedAt),
              sex: cardData.sexe,
              academicYear: 2023,
              sector: sector?.name,
              faculty: faculty?.name,
            });

            if (context === "admin") addCard(card);

            setComplete(true);
          } else {
            toast.error("Error while creating student card");
          }
        } else {
          toast.error("Error while uploading photo");
        }

        setLoading(false);
      } else {
        setNext();
      }
    }
  };

  const handlePrev = () => {
    if (isFirstStep) return;

    setPrev();
  };

  const handleSetActive = (step: number) => {
    if (isVerified(step)) {
      setActive(step);
    }
  };

  const displayFormStep = (): JSX.Element => {
    switch (activeStep) {
      case 0:
        return <FirstStep />;

      case 1:
        return <SecondStep />;

      case 2:
        return <ThirdStep />;

      default:
        return <></>;
    }
  };

  const handleNavigate = () => {
    // Reset form
    resetForm();

    // Redirect to student card
    navigate(`/dashboard/personal-info`);
  };

  const handleRetry = () => {
    // Reset form
    resetForm();
  };

  return (
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
            className={`mt-16 flex ${
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

          <div className="">
            <Button
              variant="outlined"
              className="mt-4 border-primary text-primary"
              onClick={handleRetry}
            >
              Fill again
            </Button>

            {context === "admin" && (
              <Button className="mt-4 bg-purple-700 ml-4" onClick={handleNavigate}>
                View
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
