import { Card, Typography } from "@material-tailwind/react";
import AppLogo from "../../assets/img/appLogo.png";
import { CustomStepperForm } from "@/components/organisms/CustomStepperForm";
import useLoadFaculties from "@/hooks/useLoadFaculties";
import useLoadSectors from "@/hooks/useLoadSectors";

export default function FormRegistration() {

  // Load sectors and faculties
  useLoadFaculties();
  useLoadSectors();

  return (
    <div className="w-full h-full overflow-auto flex flex-col items-center py-8 px-4 bg-primary">
      <div className="flex items-center">
        <img src={AppLogo} alt="logo" width={50} />
        <Typography className="ml-4 text-xl font-bold text-white">
          Students Card of UY1
        </Typography>
      </div>
      <Typography className="text-[2em] md:text-[3em] font-nunitoBold mt-2 text-white text-center">
        Form Registration
      </Typography>

      <Typography className="w-full lg:w-[40rem] text-lg text-white text-center">
        In order to make your student card, you have to fill this form and submit it
        by providing real information about you and we will make your student card
      </Typography>

      <Card className="w-full lg:w-[50rem] mt-8">
        <CustomStepperForm />
      </Card>
    </div>
  );
}
