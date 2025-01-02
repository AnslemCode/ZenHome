import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailContext from "../context/UserDetailContext";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(userDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:3000",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetail((prev) => ({
          ...prev,
          token: res,
        }));
        mutate(res);
        console.log(res);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
