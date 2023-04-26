import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private readonly doorsQty: number;
  private readonly seatsQty: number;

  constructor(
    { 
      id,
      model,
      year,
      color,
      buyValue,
      doorsQty,
      seatsQty,
      status = false, 
    }: ICar,
  ) {
    super({ id, model, year, color, buyValue, status });
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
}

export default Car;