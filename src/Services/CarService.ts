import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import AbstractService from './AbstractService';

class CarService extends AbstractService<ICar, Car> {
  constructor() {
    super(new CarODM(), Car, 'Car');
  }
}

export default CarService;