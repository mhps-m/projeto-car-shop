import express from 'express';
import carRoutes from './Routes/carRoutes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());

app.use(carRoutes);

app.use(ErrorHandler.handle);

export default app;