import ICar from '../Interfaces/ICar';

class Car {
  public readonly model: string;
  public readonly year: number;
  public readonly color: string;
  public readonly buyValue: number;
  private readonly doorsQty: number;
  private readonly seatsQty: number;
  public readonly status: boolean;

  constructor(
    { 
      model,
      year,
      color,
      buyValue,
      doorsQty,
      seatsQty,
      status = false, 
    } : ICar,
  ) {
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