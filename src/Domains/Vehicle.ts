import IVehicle from '../Interfaces/IVehicle';

abstract class Vehicle {
  protected id?: string;
  protected readonly model: string;
  protected readonly year: number;
  protected readonly color: string;
  protected readonly buyValue: number;
  protected readonly status: boolean;

  constructor(
    {
      id,
      model,
      year,
      color,
      buyValue,
      status = false,
    }: IVehicle,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.status = status;
  }
}

export default Vehicle;