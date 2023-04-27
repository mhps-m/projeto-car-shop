import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';

export const correctMotorcycleInput: IMotorcycle = { 
  model: 'Kawasaki Ninja',
  year: 2021,
  color: 'black',
  buyValue: 65000,
  category: 'Street',
  engineCapacity: 800,
};

export const successfulMotorcycleCreation = {
  id: '644846a28fec17ed845b29ca',
  ...correctMotorcycleInput,
  status: false,
};

export const newMotorcycleCreatedInstance = new Motorcycle(successfulMotorcycleCreation);

export const getMotorcycles: IMotorcycle[] = [
  {
    id: '644846a28fec17ed845b29ca',
    model: 'Kawasaki Ninja',
    year: 2021,
    color: 'black',
    status: false,
    buyValue: 65000,
    category: 'Street',
    engineCapacity: 800,
  },
  {
    id: '644846a28fec17es845b22da',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '643846a24fed17es845b29qa',
    model: 'Suzuki Hayabusa',
    year: 2021,
    color: 'white',
    status: false,
    buyValue: 65000,
    category: 'Street',
    engineCapacity: 800,
  },
];

export const motorcycleUpdateInput = { status: true };

export const successfulMotorcycleUpdate = {
  ...successfulMotorcycleCreation,
  status: true,
};

export const updatedMotorcycleInstance = new Motorcycle(successfulMotorcycleUpdate);

export const getMotorcyclesInstance = getMotorcycles.map((motorcycle) => (
  new Motorcycle(motorcycle)
));

export const invalidIdMessage = 'Invalid mongo id';

export const motorcycleNotFoundMessage = 'Motorcycle not found';