/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { bookVisit } from "../utils/api";
import userDetailContext from "../context/UserDetailContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);
  const {
    userDetail: { token },
    setUserDetail,
  } = useContext(userDetailContext);
  console.log("Token", token);

  const handleBookingSuccess = () => {
    toast.success("Booking successful", {
      position: "bottom-right",
    });
    setUserDetail((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError:
      () =>
      ({ response }) =>
        toast.error(response.data.message),
    onSettled: () => {
      setOpened(false);
    },
  });
  return (
    <Modal
      opened={opened}
      title="Select Your date of visit"
      centered
      onClose={() => setOpened(false)}
    >
      <div className="flexCenter flex-col gap-4">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Now
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
