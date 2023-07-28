import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchQuestions(dispatch) {
  const { isLoading, error, data } = useQuery(
    ["questions"],
    () => axios.get("http://localhost:8000/questions"),
    {
      onSuccess: (data) => {
        dispatch({ type: "dataReceived", payload: data.data });
      },
      onError: () => {
        dispatch({ type: "dataFailed" });
      },
    }
  );

  return { isLoading, error, data };
}
