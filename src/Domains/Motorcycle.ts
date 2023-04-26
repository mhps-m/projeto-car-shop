import IMotorcycle, { MotorcycleCategory } from '../Interfaces/IMotorcycle';

class Motorcycle {
  protected id?: string;
  protected readonly model: string;
  protected readonly year: number;
  protected readonly color: string;
  protected readonly buyValue: number;
  protected readonly status: boolean;
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
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.category = category;
    this.engineCapacity = engineCapacity;
    this.status = status;
  }
}

export default Motorcycle;