import express from 'express';

import routers from './routers';
import routeErrorMiddlewares from './middlewares/routErrorMiddlewares';
import errorController from './controllers/errorController';

const app = express();
app.use(express.json());
app.use(express.static(`${process.env.PWD}/public`));
app.use('/api/v1/users', routers.userRouter);
app.use('/api/v1/tours', routers.tourRouter);

app.use(routeErrorMiddlewares.undefinedRoute);

app.use(errorController.globalErrorHandler);
export default app;
