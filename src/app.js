import express from 'express';

import routers from './routers';
import routErrorMiddlewares from './middlewares/routErrorMiddlewares';

const app = express();
app.use(express.json());
app.use(express.static(`${process.env.PWD}/public`));
app.use('/api/v1/users', routers.userRouter);
app.use('/api/v1/tours', routers.tourRouter);

app.use(routErrorMiddlewares.undefined);

export default app;
