import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carController = new CarController();

const routes = Router();

routes.post('/cars', (req, res, next) => carController.create(req, res, next));

routes.get('/cars', (req, res) => carController.findAll(req, res));

routes.get('/cars/:id', (req, res, next) => carController.findById(req, res, next));

routes.put('/cars/:id', (req, res, next) => carController.update(req, res, next));

export default routes;