import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

const carSchema = new Schema<ICar>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
  status: { type: Boolean, required: false, default: false },
});

class CarODM {
  private model: Model<ICar>;

  constructor() {
    this.model = models.Car || model('Car', carSchema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create(car);
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }
}

export default CarODM;