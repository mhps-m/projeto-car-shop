import { expect } from 'chai';
import Sinon, { SinonStub, SinonStubbedInstance } from 'sinon';
import { afterEach, beforeEach } from 'mocha';
import { Request, Response, request, response } from 'express';
import { 
  carNotFoundMessage,
  carUpdateInput,
  correctCarInput,
  getCarsInstance,
  invalidIdMessage,
  newCarCreatedInstance,
  successfulCarCreation,
  updatedCarInstance,
} from '../../mocks/Car.mock';
import CarService from '../../../src/Services/CarService';
import CarController from '../../../src/Controllers/CarController';
import ErrorHandler from '../../../src/Middlewares/ErrorHandler';

describe('Testa a classe da camada controller CarController', function () {
  let req: SinonStubbedInstance<Request>;
  let res: SinonStubbedInstance<Response>;
  let next: SinonStub;

  beforeEach(() => {
    req = Sinon.stub(request);
    res = {
      ...Sinon.stub(response),
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    } as SinonStubbedInstance<Response>;
    next = Sinon.stub().callsFake((err: Error) => ErrorHandler.handle(err, req, res, next));
  });

  describe('Testa a função "create", permitindo criar um novo carro no banco', function () {
    it('Cria um novo carro com sucesso', async function () {
      Sinon.stub(CarService.prototype, 'create').resolves(newCarCreatedInstance);
      req.body = correctCarInput;

      await new CarController().create(req, res, next) as Response;
      
      expect(res.status.calledWithExactly(201)).to.deep.equal(true);
      expect(res.json.calledWithMatch(newCarCreatedInstance)).to.deep.equal(true);
      expect(next.notCalled).to.deep.equal(true);
    });

    it('Retorna erro ao passar valores inválidos ou incompletos para a criação', async function () {
      req.body = {};
      
      await new CarController().create(req, res, next);

      expect(next.calledOnce).to.deep.equal(true);
      expect(next.lastCall.lastArg).to.be.an('Error');
      expect(res.status.calledOnceWithExactly(400)).to.deep.equal(true);
      expect(res.json.lastCall.lastArg).to.haveOwnProperty('message');
      expect(res.json.lastCall.lastArg.message).to.include('Car validation failed');
    });
  });

  describe('Testa a função "findAll", retornando os carros cadastrados', function () {
    it('Retorna os carros com sucesso', async function () {
      Sinon.stub(CarService.prototype, 'findAll').resolves(getCarsInstance);

      await new CarController().findAll(req, res);

      expect(res.status.calledWithExactly(200)).to.deep.equal(true);
      expect(res.json.calledWithExactly(getCarsInstance)).to.deep.equal(true);
    });
  });

  describe(
    'Testa a função "findById", retornando um carro com id do parâmetro passado',
    function () {
      it('Retorna um carro com sucesso', async function () {
        Sinon.stub(CarService.prototype, 'findById').resolves(newCarCreatedInstance);
        req.params = { id: successfulCarCreation.id };

        await new CarController().findById(req, res, next);

        expect(res.status.calledWithExactly(200)).to.deep.equal(true);
        expect(res.json.calledWithExactly(newCarCreatedInstance)).to.deep.equal(true);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        req.params = { id: 'Id_Inválido' };
        
        await new CarController().findById(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(422)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: invalidIdMessage })).to.deep.equal(true);
      });

      it('Retorna erro ao não encontrar algum carro', async function () {
        Sinon.stub(CarService.prototype, 'findById').rejects(new Error(carNotFoundMessage));
        req.params = { id: successfulCarCreation.id };
        
        await new CarController().findById(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(404)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: carNotFoundMessage })).to.deep.equal(true);
      });
    },
  );

  describe(
    'Testa a função "update", permitindo atualizar um carro já cadastrado',
    function () {
      it('Atualiza um carro com sucesso', async function () {
        Sinon.stub(CarService.prototype, 'update').resolves(updatedCarInstance);
        req.params = { id: successfulCarCreation.id };
        req.body = carUpdateInput;

        await new CarController().update(req, res, next);

        expect(res.status.calledWithExactly(200)).to.deep.equal(true);
        expect(res.json.calledWithExactly(updatedCarInstance)).to.deep.equal(true);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        req.params = { id: 'Id_Inválido' };
        req.body = carUpdateInput;
        
        await new CarController().update(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(422)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: invalidIdMessage })).to.deep.equal(true);
      });

      it('Retorna erro ao não encontrar algum carro', async function () {
        Sinon.stub(CarService.prototype, 'update').rejects(new Error(carNotFoundMessage));
        req.params = { id: successfulCarCreation.id };
        req.body = carUpdateInput;
        
        await new CarController().update(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(404)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: carNotFoundMessage })).to.deep.equal(true);
      });
    },
  );

  afterEach(Sinon.restore);
});