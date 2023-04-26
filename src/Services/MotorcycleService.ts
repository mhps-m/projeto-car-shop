import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import AbstractService from './AbstractService';

class MotorcycleService extends AbstractService<IMotorcycle, Motorcycle> {
  constructor() {
    super(new MotorcycleODM(), Motorcycle, 'Motorcycle');
  }
}

export default MotorcycleService;