import { useEffect } from "react";

import "../styles.css";

import { Controller, useForm } from "react-hook-form";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useActions, useSignal } from "@dilane3/gx";
import { StudentsCardFormActions, StudentsCardFormState } from "@/gx/signals/studentsCardForm.signal";

type InputSchema = {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  birthPlace: string;
  matricule: string;
  sector: string;
};

const FirstStep = () => {
  const { control, watch, setValue } = useForm<InputSchema>();

  // Global actions
  const { setForm } = useActions<StudentsCardFormActions>("students-card-form");

  // Global state
  const { form } = useSignal<StudentsCardFormState>("students-card-form");

  // Watchers
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const sex = watch("sex");
  const birthDate = watch("birthDate");
  const birthPlace = watch("birthPlace");
  const matricule = watch("matricule");
  const sector = watch("sector");

  // Effects

  // Set Default values
  useEffect(() => {
    (() => {
      const {
        firstName,
        lastName,
        sex,
        birthPlace,
        birthDate,
        matricule,
        sector,
      } = form.step1;

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("sex", sex);
      setValue("birthDate", birthDate);
      setValue("birthPlace", birthPlace);
      setValue("matricule", matricule);
      setValue("sector", sector);
    })()
  }, []);

  useEffect(() => {
    handleSetForm();
  }, [firstName, lastName, sex, birthPlace, birthDate, matricule, sector]);

  // Handlers
  const handleSetForm = () => {
    setForm({
      firstName,
      lastName,
      sex,
      birthPlace,
      birthDate,
      matricule,
      sector,
    });
  };

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Informations Personnelles
      </Typography>
      <div className="mt-8 flex flex-col md:flex-row w-full gap-4">
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Name"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Surname"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="matricule"
            control={control}
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

          <Controller
            name="sex"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                color="purple"
                size="lg"
                label="Sex"
                value={value}
                onChange={onChange}
              >
                <Option value="m">Masculin</Option>
                <Option value="f">Feminin</Option>
              </Select>
            )}
          />
        </div>
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <Controller
            name="birthDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                type="date"
                size="lg"
                label="Birth date"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="birthPlace"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Birth place"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="sector"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                color="purple"
                size="lg"
                label="Sector"
                value={value}
                onChange={onChange}
              >
                <Option value="i">Informatique</Option>
                <Option value="c">Chimie</Option>
              </Select>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default FirstStep;
