import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carController = new CarController();

const routes = Router();

const carPaths = {
  BASE: '/cars',
  ID_PARAM: '/cars/:id',
};

routes.post(carPaths.BASE, (req, res, next) => carController.create(req, res, next));

routes.get(carPaths.BASE, (req, res) => carController.findAll(req, res));

routes.get(carPaths.ID_PARAM, (req, res, next) => carController.findById(req, res, next));

routes.put(carPaths.ID_PARAM, (req, res, next) => carController.update(req, res, next));

routes.delete(carPaths.ID_PARAM, (req, res, next) => carController.delete(req, res, next));

export default routes;