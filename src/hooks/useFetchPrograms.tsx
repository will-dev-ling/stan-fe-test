import { useState, useEffect, useRef } from "react";

type Status = "idle" | "fetching" | "fetched" | "error";

export type Program = {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
  rating: string;
  genre: string;
  year: number;
  language: string;
};

export type ProgramDataType = {
  status: Status;
  data: Program[];
  errorMessage: string;
};

const useFetchPrograms = (): ProgramDataType => {
  // Here we set up a cache to store the data we fetch from the API, preventing us from making unnecessary requests.
  const cache = useRef<any>({
    data: [],
  });
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Program[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  console.log("data", data);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");

      try {
        if (cache.current["data"].length > 0) {
          const data = cache.current["data"];
          setData(data);
          setStatus("fetched");
          return;
        } else {
          const response = await fetch("/data.json");
          const data = await response.json();
          cache.current["data"] = data;
          setData(data);
          setStatus("fetched");
        }
      } catch (error) {
        console.log("error", error);
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  return { status, data, errorMessage };
};

export default useFetchPrograms;
