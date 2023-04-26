import Car from '../../../src/Domains/Car';

export const correctCarInput = { 
  model: 'Chevrolet Onix',
  year: 2021,
  color: 'black',
  buyValue: 65000,
  doorsQty: 4,
  seatsQty: 2, 
};

export const successfulCarCreation = {
  id: '644846a28fec17ed845b29ca',
  ...correctCarInput,
  status: false,
};

export const newCarCreatedInstance = new Car(successfulCarCreation);

export const getCars = [
  {
    id: '644846a28fec17ed845b29ca',
    model: 'Chevrolet Onix',
    year: 2021,
    color: 'black',
    buyValue: 65000,
    doorsQty: 4,
    seatsQty: 2, 
    status: false,
  },
  {
    id: '644846a28fec17es845b22da',
    model: 'Honda Civic',
    year: 2021,
    color: 'white',
    buyValue: 30000,
    doorsQty: 4,
    seatsQty: 2, 
    status: false,
  },
  {
    id: '643846a24fed17es845b29qa',
    model: 'Fiat Uno',
    year: 2018,
    color: 'red',
    buyValue: 20000,
    doorsQty: 4,
    seatsQty: 2, 
    status: false,
  },
];

export const getCarsInstance = getCars.map((car) => new Car(car));

export const invalidIdMessage = 'Invalid mongo id';

export const carNotFoundMessage = 'Car not found';