import { Router } from "express";
import { getUserPlayHistory, getUserStats } from "../controllers/statsController.js";

const statsRouter = Router();

statsRouter.get("/playHistory/:uuid", getUserPlayHistory);
statsRouter.get("/userStats/:uuid", getUserStats);

export default statsRouter;