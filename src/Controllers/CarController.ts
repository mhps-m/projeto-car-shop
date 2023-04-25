import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import Car from '../Domains/Car';

class CarController {
  private carService: CarService = new CarService();

  public async create(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response<Car> | void> {
    try {
      const newCar = await this.carService.create(req.body);
      return res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
}

export default CarController;