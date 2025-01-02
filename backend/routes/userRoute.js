import express from "express";
import {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addFavourite,
  getAllFavourites,
} from "../controllers/userController.js";
import checkJwt from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", checkJwt, createUser);
router.post("/bookVisit/:id", checkJwt, bookVisit);
router.get("/allBookings", getAllBookings);
router.post("/cancelBooking/:id", checkJwt, cancelBooking);
router.post("/addFavourite/:rid", checkJwt, addFavourite);
router.get("/allFavourites", checkJwt, getAllFavourites);

export { router as userRoute };
