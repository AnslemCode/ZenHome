import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://zenhome-backend.vercel.app/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresidencies", {
      timeout: 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data.reverse();
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      "/user/register",
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, try again");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, try again");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `user/cancelBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, try again");
    throw error;
  }
};

export const toFav = async (rid, email, token) => {
  try {
    await api.post(
      `user/addFavourite/${rid}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, try again");
    throw error;
  }
};

export const getAllFavourites = async (email, token) => {
  if (!token) return;
  try {
    const response = await api.post(
      `/user/allFavourites`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data["favResidenciesID"];
  } catch (error) {
    toast.error("Something went wrong while fetching favourites");
    throw error;
  }
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const response = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

export const createResidency = async (data, token, userEmail) => {
  const requestedData = { ...data, userEmail };
  try {
    await api.post(
      "/residency/create",
      {
        requestedData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong while creating residency");
    throw error;
  }
};
