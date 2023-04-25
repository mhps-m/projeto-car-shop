import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import { afterEach } from 'mocha';
import CarODM from '../../../src/Models/CarODM';
import { correctCarInput, getCars, successfulCarCreation } from '../Mocks/Car.mock';
import ICar from '../../../src/Interfaces/ICar';

describe('Testa a classe de modelo CarODM', function () {
  describe('Testa a função "create", permitindo criar um novo carro', function () {
    it('Cria um carro com sucesso', async function () {
      Sinon.stub(Model, 'create').resolves(successfulCarCreation);

      const newCar = await new CarODM().create(correctCarInput);

      expect(newCar).to.deep.equal(successfulCarCreation);
    });

    it('Retorna erro ao tentar cadastrar um carro com valores incorretos', async function () {
      try {
        await new CarODM().create({} as ICar);
      } catch (err) {
        expect(err).to.be.an('Error');
        expect((err as Error).message).to.include('Car validation failed');
      }
    });
  });

  describe('Testa a função "findAll", retornando todos os carros cadastrados', function () {
    it('Retorna os carros com sucesso', async function () {
      Sinon.stub(Model, 'find').resolves(getCars);

      const cars = await new CarODM().findAll();

      expect(cars).to.deep.equal(getCars);
    });
  });

  describe(
    'Testa a função "findById", retornando um carro cujo id seja igual ao passado como parâmetro',
    function () {
      it('Retorna um carro com sucesso', async function () {
        Sinon.stub(Model, 'findById').resolves(successfulCarCreation);

        const car = await new CarODM().findById('644846a28fec17ed845b29ca');

        expect(car).to.deep.equal(successfulCarCreation);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        try {
          await new CarODM().findById('Id inválido');
        } catch (err) {
          expect(err).to.be.an('Error');
          expect((err as Error).message).to.include('Cast to ObjectId failed');
        }
      });
    },
  );

  afterEach(Sinon.restore);
});