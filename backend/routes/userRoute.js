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
router.post("/bookVisit/:id", bookVisit);
router.get("/allBookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/addFavourite/:rid", addFavourite);
router.get("/allFavourites", getAllFavourites);

export { router as userRoute };
