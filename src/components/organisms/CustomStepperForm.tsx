import React, { useCallback, useMemo } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import FirstStep from "../addStudent/steps/FirstStep";
import { ShieldCheckIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import SecondStep from "../addStudent/steps/SecondStep";
import ThirdStep from "../addStudent/steps/ThirdStep";
import { useActions, useSignal } from "@dilane3/gx";
import {
  StudentsCardFormActions,
  StudentsCardFormState,
} from "@/gx/signals/studentsCardForm.signal";

export function CustomStepperForm() {
  // Global state
  const { form, step: activeStep } =
    useSignal<StudentsCardFormState>("students-card-form");

  // Global actions
  const { setNext, setPrev, setActive } =
    useActions<StudentsCardFormActions>("students-card-form");

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
        }

        default:
          return false;
      }
    },
    [JSON.stringify(form)],
  );

  // Handlers

  const handleNext = () => {
    if (isVerified()) {
      setNext();
    }
  };

  const handlePrev = () => {
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

  return (
    <div className="w-full p-4 md:py-4 md:px-8">
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
          {activeStep === 2 ? "Valider" : "Next"}
        </Button>
      </div>
    </div>
  );
}
