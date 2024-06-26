import { useEffect } from "react";

import "../styles.css";

import { Controller, useForm } from "react-hook-form";
import { Input, Option, Select, Typography } from "@material-tailwind/react";
import { useActions, useSignal } from "@dilane3/gx";
import {
  FirstStepInputSchema,
  StudentsCardFormActions,
  StudentsCardFormState,
} from "@/gx/signals/studentsCardForm.signal";
import { SectorsState } from "@/gx/signals/sectors.signal";

const FirstStep = () => {
  const { control, watch, setValue } = useForm<FirstStepInputSchema>();

  // Global actions
  const { setForm } = useActions<StudentsCardFormActions>("students-card-form");

  // Global state
  const { form } = useSignal<StudentsCardFormState>("students-card-form");
  const { sectors } = useSignal<SectorsState>("sectors");

  // Watchers
  const name = watch("name");
  const sex = watch("sex");
  const birthDate = watch("birthDate");
  const birthPlace = watch("birthPlace");
  const matricule = watch("matricule");
  const sector = watch("sector");

  // Effects

  // Set Default values
  useEffect(() => {
    (() => {
      const { name, sex, birthPlace, birthDate, matricule, sector } = form.step1;

      setValue("name", name);
      setValue("sex", sex);
      setValue("birthDate", birthDate);
      setValue("birthPlace", birthPlace);
      setValue("matricule", matricule);
      setValue("sector", sector);
    })();
  }, []);

  useEffect(() => {
    handleSetForm();
  }, [name, sex, birthPlace, birthDate, matricule, sector]);

  // Handlers
  const handleSetForm = () => {
    setForm({
      name,
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
        Personal Informations
      </Typography>
      <div className="mt-8 flex flex-col md:flex-row w-full gap-4">
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Full Name"
                value={value}
                onChange={onChange}
              />
            )}
          />

          {/* <Controller
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
          /> */}

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
                <Option value="MALE">Masculin</Option>
                <Option value="FEMALE">Feminin</Option>
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
                {sectors.map((sector) => (
                  <Option
                    key={sector.id}
                    className="capitalize"
                    value={JSON.stringify({ id: sector.id, name: sector.name })}
                  >
                    {sector.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default FirstStep;
