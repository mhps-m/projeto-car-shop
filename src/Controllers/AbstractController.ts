import { NextFunction, Request, Response } from 'express';
import AbstractService from '../Services/AbstractService';

class AbstractController<T, R> {
  private service: AbstractService<T, R>;

  constructor(service: AbstractService<T, R>) {
    this.service = service;
  }

  public async create(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response<R> | void> {
    try {
      const newObj = await this.service.create(req.body);
      return res.status(201).json(newObj);
    } catch (err) {
      next(err);
    }
  }

  public async findAll(
    _req: Request, 
    res: Response, 
  ): Promise<Response<R[]>> {
    const objs = await this.service.findAll();
    return res.status(200).json(objs);
  }

  public async findById(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response<R> | void> {
    try {
      const { id } = req.params;
      const obj = await this.service.findById(id);
      return res.status(200).json(obj);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<R> | void> {
    try {
      const { id } = req.params;
      const updatedObj = await this.service.update(id, req.body);
      return res.status(200).json(updatedObj);
    } catch (err) {
      next(err);
    }
  }
}

export default AbstractController;