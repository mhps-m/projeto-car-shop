import { NextFunction, Request, Response } from 'express';
import Car from '../Domains/Car';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService = new CarService();

  public async create(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response<Car> | void> {
    try {
      const newCar = await this.service.create(req.body);
      return res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }

  public async findAll(
    _req: Request, 
    res: Response, 
  ): Promise<Response<Car[]>> {
    const cars = await this.service.findAll();
    return res.status(200).json(cars);
  }

  public async findById(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response<Car> | void> {
    try {
      const { id } = req.params;
      const car = await this.service.findById(id);
      return res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Car> | void> {
    try {
      const { id } = req.params;
      const updatedCar = await this.service.update(id, req.body);
      return res.status(200).json(updatedCar);
    } catch (err) {
      next(err);
    }
  }
}

export default CarController;