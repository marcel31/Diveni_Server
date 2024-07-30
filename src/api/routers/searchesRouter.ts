import { Router } from "express";
import { deleteSearch, getSearch, getSearches, postSearch, putSearch } from "../controllers/searchesController.js";
import joiMiddleware  from "../middleware/joiMidleware.js";
import { imageMiddleware } from "../middleware/imageMiddleware.js";
import { deleteSearchSchema, getManySchema, postSearchSchema } from "../../joi/questionsSchema.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const searchesRouter = Router();

searchesRouter.get("/:id",
    adminMiddleware,
    getSearch
);

searchesRouter.get("/",
    joiMiddleware(getManySchema, 'query'),
    getSearches);

searchesRouter.put("/:id",
    adminMiddleware,
    imageMiddleware('searchesQuiz').single('image'),
    joiMiddleware(postSearchSchema, 'body'),
    putSearch
);

searchesRouter.delete("/:id",
    adminMiddleware,
    joiMiddleware(deleteSearchSchema, 'params'),
    deleteSearch
);

searchesRouter.post("/",
    adminMiddleware,
    imageMiddleware('searchesQuiz').single('image'),
    joiMiddleware(postSearchSchema, 'body'),
    postSearch
);

export default searchesRouter;
