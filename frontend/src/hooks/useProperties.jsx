import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const {
    data,
    isError,
    isLoading,
    refetch: refech,
  } = useQuery("allProperties", getAllProperties, { refetchOnMount: false });

  return {
    data,
    isError,
    isLoading,
    refech,
  };
};

export default useProperties;
