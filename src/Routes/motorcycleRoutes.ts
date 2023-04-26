import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleController = new MotorcycleController();

const routes = Router();

routes.post('/motorcycles', (req, res, next) => motorcycleController.create(req, res, next));

routes.get('/motorcycles', (req, res) => motorcycleController.findAll(req, res));

routes.get('/motorcycles/:id', (req, res, next) => motorcycleController.findById(req, res, next));

routes.put('/motorcycles/:id', (req, res, next) => motorcycleController.update(req, res, next));

export default routes;