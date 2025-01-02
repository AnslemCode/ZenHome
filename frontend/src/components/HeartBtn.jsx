/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { FaHeart } from "react-icons/fa";
import useAuthCheck from "../hooks/useAuthCheck";
import userDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { toFav } from "../utils/api";
import { updateFavourites, checkFavourites } from "../utils/common";

const HeartBtn = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { token, favourites },
    setUserDetail,
  } = useContext(userDetailContext);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });

  const handleLike = async () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#8ac243" ? "white" : "#8ac243"));
    }
  };

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);
  return (
    <FaHeart
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
      color={heartColor}
      size={23}
      className="cursor-pointer drop-shadow-sm"
    />
  );
};

export default HeartBtn;
