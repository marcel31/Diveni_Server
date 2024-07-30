import { Router } from 'express';
import searchesRouter from './routers/searchesRouter.js';
import aiImageRouter from './routers/aiImageRouter.js';
import userRouter from './routers/userRouter.js';
import statsRouter from './routers/statsRouter.js';

const apiRouter = Router();

apiRouter.use('/searches', searchesRouter);
apiRouter.use('/aiimages', aiImageRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/stats', statsRouter)

export default apiRouter;