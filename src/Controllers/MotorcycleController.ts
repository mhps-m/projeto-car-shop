import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import AbstractController from './AbstractController';

class MotorcycleController extends AbstractController<IMotorcycle, Motorcycle> {
  constructor() {
    super(new MotorcycleService());
  }
}

export default MotorcycleController;