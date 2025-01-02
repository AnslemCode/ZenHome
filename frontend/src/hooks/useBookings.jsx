import { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import userDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(userDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const {
    data,
    isError,
    isLoading,
    refetch: refetch,
  } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails?.token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({
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
  }, [userDetails?.token]);
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useBookings;