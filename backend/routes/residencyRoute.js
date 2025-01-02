import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";
import checkJwt from "../config/auth0Config.js";

const router = express.Router();

router.post("/create", checkJwt, createResidency);
router.get("/allresidencies", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
