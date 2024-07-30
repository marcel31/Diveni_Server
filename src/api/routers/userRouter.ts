import { Router } from "express";
import { login } from "../controllers/userController.js";
import joiMiddleware from "../middleware/joiMidleware.js";
import { userSchema } from "../../joi/userSchema.js";

const userRouter = Router();

userRouter.post("/login",
    joiMiddleware(userSchema, "body"),
    login);

export default userRouter;