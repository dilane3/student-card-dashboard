import axios from "axios";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { UploadContext } from "../context/uploadContext";
import { toast } from "react-toastify";
import instance, { baseURL } from "@/api";

type ReactChildren = {
  children: ReactNode;
};

const UploadProvider = ({ children }: ReactChildren) => {
  // State Object for managing Files
  const [file, setFile] = useState<File | null>(null);
  // Provider
  // const [progressBars, setProgressBars] = useState<number[]>([]);

  // Annotation time timer
  const [timeTaken, setTimeTaken] = useState(0);

  // Observer on the download action
  // const [download, setDownload] = useState<boolean>(false);
  // // Observer of the response download url
  // const [downloadUrl, setDownloadUrl] = useState<string>("");
  // Observer on the annotation event
  const [loading, setLoading] = useState<boolean>(false);
  // Observer on the error event
  const [error, setError] = useState<boolean>(false);
  // Obser on the drag event
  const [dragActive, setDragActive] = useState(false);
  // Reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);
  // Observer contaiing the list of ext, choosed by the user
  const acceptFileExtension = ".csv";
  // Observer on a file load event
  const [blockFileLoad, setBlockFileLoad] = useState<boolean>(false);

  useEffect(() => {
    let timerId: number = 0;
    if (loading) {
      const startTime = window.performance.now();
      timerId = setInterval(() => {
        const endTime = window.performance.now();
        setTimeTaken(endTime - startTime);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [loading]);

  // Handle drag events inside the draggable area
  const handleDrag = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If we detect that he is dragging over the draggable area
    if (e.type === "dragenter" || e.type === "dragover") {
      // We set that he is draggingin to True
      setDragActive(true);
      // Else we set that he is draggingin to false
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /**
   * Selected file validator function, based on the uploader options.
   *
   * If the value returned is true, then the validation failed
   * @param file
   * @returns
   */
  const filesValidator = (file: File): boolean => {
    let validValue = false;

    // This is to prevent file loading in the input, when the file are being sent to the server
    if (blockFileLoad) return true;

    // If the Files or one of them doesn't respect the accepted exceptions, don't load them
    if (acceptFileExtension.includes(file.type.split("/")[1]) === false) {
      toast.error("Wrong file extension");
      validValue = true;
    }

    // If the maxFileSize limit is defined and the Selected files sizes exceeds it, don't load the file
    if (file && file.size < 4000000 === false) {
      toast.error(`File size too big: ${4000000 / 1000000} MB is the maximum`);
      validValue = true;
    }

    return validValue;
  };

  // Triggers when file(s) are dropped in the droppable area
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // When the user has dropped and the upmost validation is done,
    // the we can set the drag to NotActive
    setDragActive(false);

    // Validate the file dropped
    if (filesValidator(e.dataTransfer!.files[0])) return;

    if (e.dataTransfer!.files && e.dataTransfer!.files[0]) {
      // Add the new files drop to the current files Observer
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Triggers when file is selected with click event
  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    // If there are files, add them to the current files Observer

    // Validate the file dropped
    if (filesValidator((e.target as HTMLInputElement).files![0])) return;

    if (
      (e.target as HTMLInputElement).files &&
      (e.target as HTMLInputElement).files![0]
    ) {
      setFile((e.target as HTMLInputElement).files![0]);
    }
  };

  // Removes all the files from the current files Observer
  const handleClear = () => {
    setFile(null);
    // setDownloadUrl("");
    setTimeTaken(0);
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current!.click();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) return;

    // Create a new form object
    const formData = new FormData();

    // Add the file
    formData.append("file", file);

    try {
      // Set the files as sent
      setLoading(true);
      // Sending the files to the backend for annotation
      const response = await axios.post(
        `${baseURL}student-cards/create/csv`,
        formData,
        {
          // Header that specifies the type of data we are send
          // Specifically we say that we are send may form-data objects
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log(response);

      toast.success(response.data);
      // toast.success("CSV file as been uploaded")

      // Stop the loading event
      setLoading(false);
      // No error found setter
      setError(false);
      // Set the result as downloadable
    } catch (error: any) {
      setError(true);
      setLoading(false);

      toast.error(error["message"]);
      console.log(error);
    }
  };

  const value = {
    file: file,
    setFile: setFile,
    // progressBars: progressBars,
    // setProgressBars: setProgressBars,
    loading: loading,
    setLoading: setLoading,
    timeTaken: timeTaken,
    setTimeTaken: setTimeTaken,
    error: error,
    setError: setError,
    dragActive: dragActive,
    inputFieldRef: inputRef,
    setDragActive: setDragActive,
    handleDragEvent: handleDrag,
    handleDropEvent: handleDrop,
    handleChangeEvent: handleChange,
    handleClearEvent: handleClear,
    onButtonClickEvent: onButtonClick,
    handleSubmitEvent: handleSubmit,
  };

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
};

export default UploadProvider;
