import { useState, useEffect, useRef } from "react";
import { Program } from "../types/Program";

type Status = "fetching" | "fetched" | "error";

export type ProgramDataType = {
  status: Status;
  data: Program[];
};

const useFetchPrograms = (): ProgramDataType => {
  // Here we set up a cache to store the data we fetch from the API, preventing us from making unnecessary requests.
  const cache = useRef<any>({
    data: [],
  });
  const [status, setStatus] = useState<Status>("fetching");
  const [data, setData] = useState<Program[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Wrapping in a setTimeout of 1.5 seconds to show the skeleton UI Loader
      setTimeout(async () => {
        try {
          if (cache.current["data"].length > 0) {
            const data = cache.current["data"];
            setData(data);
            setStatus("fetched");
            return;
          } else {
            const response = await fetch("data.json");
            const data = await response.json();
            cache.current["data"] = data;
            setData(data);
            setStatus("fetched");
          }
        } catch (error) {
          setStatus("error");
        }
      }, 1000);
    };

    fetchData();
  }, []);

  return { status, data };
};

export default useFetchPrograms;
