import {
  SecondStepInputSchema,
  StudentsCardFormActions,
  StudentsCardFormState,
} from "@/gx/signals/studentsCardForm.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { Controller, useForm } from "react-hook-form";
import "../styles.css";
import { Input, Select, Typography, Option } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { generateImage } from "@/utils";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
// @ts-ignore
import { useCountries } from "use-react-countries";

// import cloud from "../../../assets/images/icons/settings/cloud.png";

const SecondStep = () => {
  const { control, watch, setValue } = useForm<SecondStepInputSchema>();

  // Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Global actions
  const { setForm } = useActions<StudentsCardFormActions>("students-card-form");

  // Global state
  const { form } = useSignal<StudentsCardFormState>("students-card-form");

  // Watchers
  const nationality = watch("nationality");
  const email = watch("email");
  const phone = watch("phone");
  const photo = watch("photo");

  // Hooks
  const { countries } = useCountries();

  // Effects

  // Set Default values
  useEffect(() => {
    (() => {
      const { nationality, email, phone, photo } = form.step2;

      setValue("nationality", nationality || "Cameroon");
      setValue("email", email);
      setValue("phone", phone);
      setValue("photo", photo);
    })();
  }, []);

  useEffect(() => {
    handleSetForm();
  }, [nationality, email, phone, photo]);

  // Handlers
  const handleSetForm = () => {
    setForm({
      nationality,
      email,
      phone,
      photo,
    });
  };

  const handleOpenFileExplorer = () => {
    inputRef.current?.click();
  };

  const handleChooseFile = (e: any) => {
    const file = e.target.files[0];

    setValue("photo", file);
  };

  const handleRemovePhoto = () => {
    setValue("photo", undefined);
  };

  const displayPhoto = () => {
    if (photo) {
      return URL.createObjectURL(photo);
    }

    return "";
  };

  const putInAlphabeticOrder = (countries: { name: string; flags: any }[]) => {
    return countries.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  };

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Informations Supplementaires
      </Typography>
      <div className="mt-8 flex flex-col md:flex-row w-full gap-4">
        <div className="mb-4 flex w-full md:w-1/2  flex-col gap-6">
          <Controller
            name="nationality"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                size="lg"
                label="Nationality"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
                value={value}
                onChange={onChange}
              >
                {putInAlphabeticOrder(countries).map(
                  ({ name, flags }: { name: string; flags: any }) => (
                    <Option
                      key={name}
                      value={name}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}
                    </Option>
                  ),
                )}
              </Select>
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Email"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                color="purple"
                crossOrigin={null}
                size="lg"
                label="Phone"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="mb-4 flex w-full md:w-1/2  flex-col gap-6">
          {photo ? (
            <div className="relative h-[25rem] w-full md:h-full md:w-[10rem] bg-red-300 ">
              <img
                src={displayPhoto()}
                alt="avatar"
                className="h-full w-full object-cover"
              />

              <span
                className="absolute -right-5 -top-5 bg-white rounded-full"
                onClick={handleRemovePhoto}
              >
                <XCircleIcon className="w-10 fill-primary" />
              </span>
            </div>
          ) : (
            <div
              className="relative flex h-[10rem] w-full md:h-full items-center justify-center rounded-lg border-2 border-dashed border-purple-200 cursor-pointer"
              onClick={handleOpenFileExplorer}
              onChange={handleChooseFile}
            >
              <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/*"
                name="photo"
                id="photo"
              />

              <Typography className="absolute">Click to upload a picture</Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SecondStep;
