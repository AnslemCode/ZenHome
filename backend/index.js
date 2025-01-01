import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
