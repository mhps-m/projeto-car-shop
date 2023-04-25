import express from 'express';
import carRoutes from './Routes/carRoutes';

const app = express();
app.use(express.json());
app.use(carRoutes);

export default app;