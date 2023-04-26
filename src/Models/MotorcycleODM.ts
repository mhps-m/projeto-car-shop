import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false, default: false },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true, enum: ['Street', 'Custom', 'Trail'] },
  engineCapacity: { type: Number, required: true },
});

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    super(motorcycleSchema, 'Motorcycle');
  }
}

export default MotorcycleODM;