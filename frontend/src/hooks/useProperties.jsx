import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const {
    data,
    isError,
    isLoading,
    refetch: refetch,
  } = useQuery("allProperties", getAllProperties, { refetchOnMount: false });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
