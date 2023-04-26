import IMotorcycle, { MotorcycleCategory } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private readonly category: MotorcycleCategory;
  private readonly engineCapacity: number;

  constructor(
    { 
      id,
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
      status = false, 
    } : IMotorcycle,
  ) {
    super({ id, model, year, color, buyValue, status });
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}

export default Motorcycle;