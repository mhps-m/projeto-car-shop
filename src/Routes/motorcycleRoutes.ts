import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleController = new MotorcycleController();

const routes = Router();

const motorcyclePaths = {
  BASE: '/motorcycles',
  ID_PARAM: '/motorcycles/:id',
};

routes.post(motorcyclePaths.BASE, (req, res, next) => motorcycleController.create(req, res, next));

routes.get(motorcyclePaths.BASE, (req, res) => motorcycleController.findAll(req, res));

routes.get(
  motorcyclePaths.ID_PARAM,
  (req, res, next) => motorcycleController.findById(req, res, next),
);

routes.put(
  motorcyclePaths.ID_PARAM,
  (req, res, next) => motorcycleController.update(req, res, next),
);

routes.delete(
  motorcyclePaths.ID_PARAM,
  (req, res, next) => motorcycleController.delete(req, res, next),
);

export default routes;