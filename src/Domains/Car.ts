import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string;
  protected readonly model: string;
  protected readonly year: number;
  protected readonly color: string;
  protected readonly buyValue: number;
  private readonly doorsQty: number;
  private readonly seatsQty: number;
  protected readonly status: boolean;

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
    } : ICar,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
    this.status = status;
  }
}

export default Car;