import { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import userDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetail, setUserDetail } = useContext(userDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const {
    data,
    isError,
    isLoading,
    refetch: refetch,
  } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetail?.token),
    onSuccess: (data) => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: data,
      }));
    },
    enabled: user !== undefined,
    staleTime: 30000,
  });
  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetail?.token]);
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useBookings;
