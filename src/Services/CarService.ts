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
}

export default CarService;