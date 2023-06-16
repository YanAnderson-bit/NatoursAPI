import express from 'express';

import routers from './routers';

const app = express();
app.use(express.json());
app.use(express.static(`${process.env.PWD}/public`));
app.use('/api/v1/users', routers.userRouter);
app.use('/api/v1/tours', routers.tourRouter);

export default app;
