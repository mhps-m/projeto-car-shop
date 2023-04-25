import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carController = new CarController();

const routes = Router();

routes.post('/cars', (req, res, next) => carController.create(req, res, next));

export default routes;