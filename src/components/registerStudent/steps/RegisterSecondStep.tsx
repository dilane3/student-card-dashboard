import {
  CompletionSecondStepInputSchema,
  StudentsCompletionFormActions,
  StudentsCompletionFormState,
} from "@/gx/signals/studentsCompletionForm.signal";
import { isValidEmail, isValidPhoneNumber } from "@/utils";
import { useActions, useSignal } from "@dilane3/gx";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Input, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterSecondStep = () => {
  const { setValue, control, watch } = useForm<CompletionSecondStepInputSchema>();

  // Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Global actions
  const { setForm } = useActions<StudentsCompletionFormActions>(
    "students-completion-form",
  );

  // Global state
  const { form } = useSignal<StudentsCompletionFormState>(
    "students-completion-form",
  );

  const email = watch("email");
  const phone = watch("phone");
  const photo = watch("photo");

  // Effects

  // Set Default values
  useEffect(() => {
    (() => {
      const { email, phone, photo } = form.step2;

      setValue("email", email);
      setValue("phone", phone);
      setValue("photo", photo);
    })();
  }, []);

  useEffect(() => {
    handleSetForm();
  }, [email, phone, photo]);

  // Handlers
  const handleSetForm = () => {
    setForm({
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

  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row w-full gap-4">
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div>
                <Input
                  color={email && !isValidEmail(email) ? "red" : "purple"}
                  crossOrigin={null}
                  size="lg"
                  label="Email"
                  value={value}
                  onChange={onChange}
                />
                {email && !isValidEmail(email) && (
                  <p className="text-red-500 text-sm">Invalid email</p>
                )}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div>
                <p className="text-sm font-semibold">Phone number</p>
                <PhoneInput
                  onChange={onChange}
                  name="phone"
                  value={value}
                  defaultCountry="cm"
                  inputStyle={{
                    height: "2.5rem",
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    border: `1px solid ${
                      phone && !isValidPhoneNumber(phone)
                        ? "red"
                        : "rgba(24, 63, 76, 0.4)"
                    }`,
                    borderLeftWidth: "2px",
                    width: "100%",
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      height: "2.5rem",
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                      paddingLeft: 10,
                      border: `1px solid ${
                        phone && !isValidPhoneNumber(phone)
                          ? "red"
                          : "rgba(24, 63, 76, 0.4)"
                      }`,
                      paddingRight: 5,
                    },
                  }}
                />
                {phone ? (
                  isValidPhoneNumber(phone) ? undefined : (
                    <p className="block text-red-500 mt-1 text-sm">
                      Invalid Phone Number
                    </p>
                  )
                ) : (
                  ""
                )}
              </div>
            )}
          />
        </div>
        <div className="mb-4 flex w-full md:w-1/2 flex-col gap-6">
          {photo ? (
            <div className="relative h-[25rem] w-full md:h-full md:w-[13rem] bg-primary">
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

export default RegisterSecondStep;
