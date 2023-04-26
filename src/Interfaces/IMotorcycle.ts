import IVehicle from './IVehicle';

export type MotorcycleCategory = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle {
  category: MotorcycleCategory
  engineCapacity: number
}

export default IMotorcycle;