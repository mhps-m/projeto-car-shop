import { expect } from 'chai';
import Sinon from 'sinon';
import { afterEach } from 'mocha';
import CarODM from '../../../src/Models/CarODM';
import { 
  carNotFoundMessage, 
  carUpdateInput, 
  correctCarInput, 
  getCars,
  invalidIdMessage, 
  successfulCarCreation,
  successfulCarUpdate, 
} from '../Mocks/Car.mock';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testa a classe de serviço CarService', function () {
  describe('Testa a função "create", que cria um novo carro no banco de dados', function () {
    it('Cria um carro com sucesso', async function () {
      Sinon.stub(CarODM.prototype, 'create').resolves(successfulCarCreation);

      const newCar = await new CarService().create(correctCarInput);

      expect(newCar instanceof Car).to.deep.equal(true);
      expect(newCar).to.deep.equal(successfulCarCreation);
    });
  });

  describe('Testa a função "findAll", retornando os carros cadastrados', function () {
    it('Retorna os carros com sucesso', async function () {
      Sinon.stub(CarODM.prototype, 'findAll').resolves(getCars);

      const cars = await new CarService().findAll();

      expect(cars.every((car) => car instanceof Car)).to.deep.equal(true);
      expect(cars).to.deep.equal(getCars);
    });
  });

  describe(
    'Testa a função "findById", retornando um carro com id igual ao passado por parâmetro', 
    function () {
      it('Retorna um carro com sucesso', async function () {
        Sinon.stub(CarODM.prototype, 'findById').resolves(successfulCarCreation);

        const car = await new CarService().findById(successfulCarCreation.id);

        expect(car).to.be.an.instanceOf(Car);
        expect(car).to.deep.equal(successfulCarCreation);
      });

      it('Retorna erro ao tentar passar um id com formato inválido', async function () {
        try {
          await new CarService().findById('Id inválido');
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(invalidIdMessage);
        }
      });

      it('Retorna erro ao não encontrar algum carro correspondente', async function () {
        Sinon.stub(CarODM.prototype, 'findById').resolves(null);
        try {
          await new CarService().findById(successfulCarCreation.id);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(carNotFoundMessage);
        }
      });
    },
  );

  describe(
    'Testa a função "update", permitindo atualizar um carro já cadastrado', 
    function () {
      it('Atualiza um carro com sucesso', async function () {
        Sinon.stub(CarODM.prototype, 'update').resolves(successfulCarUpdate);

        const updatedCar = await new CarService().update(successfulCarCreation.id, carUpdateInput);

        expect(updatedCar).to.be.an.instanceOf(Car);
        expect(updatedCar).to.deep.equal(successfulCarUpdate);
      });

      it('Retorna erro ao tentar passar um id com formato inválido', async function () {
        try {
          await new CarService().update('Id inválido', carUpdateInput);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(invalidIdMessage);
        }
      });

      it('Retorna erro ao não encontrar algum carro correspondente', async function () {
        Sinon.stub(CarODM.prototype, 'update').resolves(null);
        try {
          await new CarService().update(successfulCarCreation.id, carUpdateInput);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(carNotFoundMessage);
        }
      });
    },
  );

  afterEach(Sinon.restore);
});