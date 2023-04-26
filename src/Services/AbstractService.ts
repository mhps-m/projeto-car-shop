import { isValidObjectId } from 'mongoose';
import AbstractODM from '../Models/AbstractODM';
import IDomainConstructor from '../Interfaces/IDomainConstructor';

abstract class AbstractService<T, R> {
  private ODM: AbstractODM<T>;
  private Domain: IDomainConstructor<T, R>;
  private domainName: string;

  constructor(
    ODM: AbstractODM<T>,
    Domain: IDomainConstructor<T, R>,
    domainName: string,
  ) {
    this.ODM = ODM;
    this.Domain = Domain;
    this.domainName = domainName;
  }

  private testObjectId(id: string): void {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
  }

  public async create(obj: T): Promise<R> {
    const newObj = await this.ODM.create(obj);
    return new this.Domain(newObj);
  }

  public async findAll(): Promise<R[]> {
    const objs = await this.ODM.findAll();
    return objs.map((obj) => new this.Domain(obj));
  }

  public async findById(id: string): Promise<R | void> {
    this.testObjectId(id);

    const obj = await this.ODM.findById(id);

    if (!obj) throw new Error(`${this.domainName} not found`);

    return new this.Domain(obj);
  }

  public async update(id: string, data: Partial<T>): Promise<R | void> {
    this.testObjectId(id);

    const updatedObj = await this.ODM.update(id, data);

    if (!updatedObj) throw new Error(`${this.domainName} not found`);

    return new this.Domain(updatedObj);
  }
}

export default AbstractService;