import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// CONTROLLER FUNCTION FOR CREATING A USER
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User created successfully",
      user,
    });
  } else
    res.status(201).send({
      message: "User already exists",
    });
});

// CONTROLLER FUNCTION FOR BOOKING A VISIT
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        bookedVisits: true,
      },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(201).send({
        message: "Visit already booked",
      });
    } else {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          bookedVisits: {
            push: {
              id,
              date,
            },
          },
        },
      });
    }
    res.send({
      message: "Visit booked successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// CONTROLLER FUNCTION FOR GETTING ALL BOOKINGS
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const booking = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        bookedVisits: true,
      },
    });
    res.status(200).send(booking);
  } catch (error) {
    throw new Error(error);
  }
});

// CONTROLLER FUNCTION FOR CANCELLING USER BOOKINGS
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        bookedVisits: true,
      },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(400).json({
        message: "Visit not found",
      });
    } else {
      user.bookedVisits.splice(index, 1);

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send({
        message: "Visit cancelled successfully",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// CONTROLLER FUNCTION FOR ADDING A RESIDENCY TO FAVOURITES OF A USER
export const addFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user.favResidenciesID.includes(rid)) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Residency removed from favourites", updatedUser });
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Residency added to favourites", user: updatedUser });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// CONTROLLER FUNCTION FOR GETTING ALL FAVOURITES OF A USER
export const getAllFavourites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResidencies = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        favResidenciesID: true,
      },
    });
    res.status(200).send(favResidencies);
  } catch (error) {
    throw new Error(error);
  }
});
