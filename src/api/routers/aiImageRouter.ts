import { Router } from "express";
import joiMiddleware from "../middleware/joiMidleware.js";
import { deleteAiImage, getAiImage, getAiImages, postAiImage, putAiImage } from "../controllers/aiImageController.js";
import { getManySchema, getOneSchema } from "../../joi/questionsSchema.js";
import { imageMiddleware } from "../middleware/imageMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const aiImageRouter = Router();

aiImageRouter.get("/:id",
    joiMiddleware(getOneSchema, 'params'),
    getAiImage
)
aiImageRouter.get("/",
    joiMiddleware(getManySchema, 'query'),
    getAiImages);

aiImageRouter.post("/",
    adminMiddleware,
    imageMiddleware('imageQuiz').array('image', 2),
    postAiImage);

aiImageRouter.put("/:id",
    adminMiddleware,
    joiMiddleware(getOneSchema, 'params'),
    imageMiddleware('imageQuiz').array('image', 2),
    putAiImage);

aiImageRouter.delete("/:id",
    adminMiddleware,
    joiMiddleware(getOneSchema, 'params'),
    deleteAiImage);

export default aiImageRouter;