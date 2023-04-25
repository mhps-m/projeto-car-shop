import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM = new CarODM();
  
  public async create(car: ICar): Promise<Car> {
    const newCar = await this.carODM.create(car);
    return new Car(newCar);
  }

  public async findAll(): Promise<Car[]> {
    const cars = await this.carODM.findAll();
    return cars.map((car) => new Car(car));
  }

  public async findById(id: string): Promise<Car | void> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');

    const car = await this.carODM.findById(id);

    if (!car) throw new Error('Car not found');

    return new Car(car);
  }
}

export default CarService;