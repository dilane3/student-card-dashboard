import { Button, Card, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { UploadContext } from "@/context/uploadContext";
import { formatTime } from "@/utils";
import {
  ArchiveBoxXMarkIcon,
  ArrowPathIcon,
  CursorArrowRippleIcon,
  DocumentArrowUpIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

const UploadStudents = () => {
  // Main state handler
  const uploadContext = useContext(UploadContext);

  const displayTimeTaken = () => {
    if (uploadContext?.timeTaken && uploadContext.timeTaken > 0) {
      return formatTime(uploadContext.timeTaken);
    } else {
      return "00:00:00";
    }
  };

  return (
    <div className="w-full h-[100vh] overflow-auto flex flex-col items-center py-8">
      <Typography className="text-[2em] md:text-[3em] font-nunitoBold mt-2  text-center">
        Students file Upload
      </Typography>

      <Typography className="w-full lg:w-[40rem] text-lg  text-center">
        In order to add or update in bulk a list of students inside the database, you
        have to upload a csv file inside this form and submit it
      </Typography>

      <Card className="w-full relative h-[50%] flex justify-center items-center rounded-xl lg:w-[50rem] mt-10">
        <div className="absolute top-0 right-0 flex gap-1 items-center transform rounded-lg bg-white p-2 text-center">
          <ClockIcon className="w-5" />
          <span>{displayTimeTaken()}</span>
        </div>

        <form
          id="form-file-upload"
          onDragEnter={(e) => {
            console.log(uploadContext?.file);

            if (!uploadContext?.file) {
              uploadContext?.handleDragEvent(e);
            }
          }}
          onSubmit={(e) => e.preventDefault()}
          className={`w-full h-full flex justify-center items-center rounded-xl`}
        >
          {uploadContext?.file ? (
            <>
              <div>
                <div className="flex items-center gap-2">
                  <DocumentArrowUpIcon className="w-12 text-primary" />
                  <div>
                    <Typography className="font-nunitoBold">
                      {uploadContext.file.name}
                    </Typography>
                    <Typography className="font-nunitoBold text-gray-500">
                      {uploadContext.file.size / 1000}Kb
                    </Typography>
                  </div>
                </div>

                <div className="mt-6 flex gap-4 justify-between w-full">
                  <Button
                    onClick={uploadContext.handleClearEvent}
                    className="bg-gray-700 px-4 py-2 flex h-min items-center gap-1 rounded-md hover:bg-gray-500"
                  >
                    <ArchiveBoxXMarkIcon className="w-5" />
                    <span className="">Cancel</span>
                  </Button>
                  <Button
                    onClick={uploadContext.handleSubmitEvent}
                    className="bg-primary hover:bg-primary/75 flex h-min items-center gap-1 rounded-md px-4 py-2"
                  >
                    {uploadContext.loading ? (
                      <>
                        <ArrowPathIcon className="w-5 animate-spin" />
                        <span>Loading</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5" />
                        <span>Submit</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <input
                ref={uploadContext?.inputFieldRef}
                accept="text/csv"
                type="file"
                name="file"
                id="input-file-upload"
                // multiple={true}
                className="hidden"
                onChange={uploadContext?.handleChangeEvent}
              />
              <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={uploadContext?.dragActive ? "drag-active" : ""}
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-1">
                      <PaperClipIcon className="w-5" />
                      <Typography className="font-nunitoRegular">
                        Drag and drop your csv file here
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <hr className="h-[0.05em] mr-1 w-[6em] bg-gray-800" />
                      <Typography className="font-nunitoRegular my-1">or</Typography>
                      <hr className="h-[0.05em] ml-1 w-[6em] bg-gray-800" />
                    </div>
                    <Button
                      className="upload-button bg-primary px-4 py-2 rounded-lg flex gap-2 items-center"
                      onClick={uploadContext?.onButtonClickEvent}
                    >
                      <CursorArrowRippleIcon className="w-5" />
                      <span className="font-nunitoRegular">Choose your file</span>
                    </Button>
                  </div>
                </div>
              </label>
              {uploadContext?.dragActive && !uploadContext.file && (
                <div
                  id="drag-file-element"
                  className="bg-gray-300/[0.4] absolute left-0 top-0 w-full z-20 rounded-lg h-full"
                  onDragEnter={uploadContext?.handleDragEvent}
                  onDragLeave={uploadContext?.handleDragEvent}
                  onDragOver={uploadContext?.handleDragEvent}
                  onDrop={uploadContext?.handleDropEvent}
                ></div>
              )}
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default UploadStudents;
