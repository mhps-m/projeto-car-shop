import Car from '../Domains/Car';
import CarService from '../Services/CarService';
import AbstractController from './AbstractController';
import ICar from '../Interfaces/ICar';

class CarController extends AbstractController<ICar, Car> {
  constructor() {
    super(new CarService());
  }
}

export default CarController;