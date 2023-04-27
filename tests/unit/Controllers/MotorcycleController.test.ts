import { expect } from 'chai';
import Sinon, { SinonStub, SinonStubbedInstance } from 'sinon';
import { afterEach, beforeEach } from 'mocha';
import { Request, Response, request, response } from 'express';
import { 
  motorcycleNotFoundMessage,
  motorcycleUpdateInput,
  correctMotorcycleInput,
  getMotorcyclesInstance,
  invalidIdMessage,
  newMotorcycleCreatedInstance,
  successfulMotorcycleCreation,
  updatedMotorcycleInstance,
} from '../../mocks/Motorcycle.mock';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import ErrorHandler from '../../../src/Middlewares/ErrorHandler';

describe('Testa a classe da camada controller MotorcycleController', function () {
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

  describe('Testa a função "create", permitindo criar uma nova moto no banco', function () {
    it('Cria uma nova moto com sucesso', async function () {
      Sinon.stub(MotorcycleService.prototype, 'create').resolves(newMotorcycleCreatedInstance);
      req.body = correctMotorcycleInput;

      await new MotorcycleController().create(req, res, next) as Response;
      
      expect(res.status.calledWithExactly(201)).to.deep.equal(true);
      expect(res.json.calledWithMatch(newMotorcycleCreatedInstance)).to.deep.equal(true);
      expect(next.notCalled).to.deep.equal(true);
    });

    it('Retorna erro ao passar valores inválidos ou incompletos para a criação', async function () {
      req.body = {};
      
      await new MotorcycleController().create(req, res, next);

      expect(next.calledOnce).to.deep.equal(true);
      expect(next.lastCall.lastArg).to.be.an('Error');
      expect(res.status.calledOnceWithExactly(400)).to.deep.equal(true);
      expect(res.json.lastCall.lastArg).to.haveOwnProperty('message');
      expect(res.json.lastCall.lastArg.message).to.include('Motorcycle validation failed');
    });
  });

  describe('Testa a função "findAll", retornando as motos cadastradas', function () {
    it('Retorna as motos com sucesso', async function () {
      Sinon.stub(MotorcycleService.prototype, 'findAll').resolves(getMotorcyclesInstance);

      await new MotorcycleController().findAll(req, res);

      expect(res.status.calledWithExactly(200)).to.deep.equal(true);
      expect(res.json.calledWithExactly(getMotorcyclesInstance)).to.deep.equal(true);
    });
  });

  describe(
    'Testa a função "findById", retornando uma moto com id do parâmetro passado',
    function () {
      it('Retorna uma moto com sucesso', async function () {
        Sinon.stub(MotorcycleService.prototype, 'findById').resolves(newMotorcycleCreatedInstance);
        req.params = { id: successfulMotorcycleCreation.id };

        await new MotorcycleController().findById(req, res, next);

        expect(res.status.calledWithExactly(200)).to.deep.equal(true);
        expect(res.json.calledWithExactly(newMotorcycleCreatedInstance)).to.deep.equal(true);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        req.params = { id: 'Id_Inválido' };
        
        await new MotorcycleController().findById(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(422)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: invalidIdMessage })).to.deep.equal(true);
      });

      it('Retorna erro ao não encontrar alguma moto', async function () {
        Sinon.stub(MotorcycleService.prototype, 'findById')
          .rejects(new Error(motorcycleNotFoundMessage));
        req.params = { id: successfulMotorcycleCreation.id };
        
        await new MotorcycleController().findById(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(404)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: motorcycleNotFoundMessage }))
          .to.deep.equal(true);
      });
    },
  );

  describe(
    'Testa a função "update", permitindo atualizar uma moto já cadastrada',
    function () {
      it('Atualiza uma moto com sucesso', async function () {
        Sinon.stub(MotorcycleService.prototype, 'update').resolves(updatedMotorcycleInstance);
        req.params = { id: successfulMotorcycleCreation.id };
        req.body = motorcycleUpdateInput;

        await new MotorcycleController().update(req, res, next);

        expect(res.status.calledWithExactly(200)).to.deep.equal(true);
        expect(res.json.calledWithExactly(updatedMotorcycleInstance)).to.deep.equal(true);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        req.params = { id: 'Id_Inválido' };
        req.body = motorcycleUpdateInput;
        
        await new MotorcycleController().update(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(422)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: invalidIdMessage })).to.deep.equal(true);
      });

      it('Retorna erro ao não encontrar alguma moto', async function () {
        Sinon.stub(MotorcycleService.prototype, 'update')
          .rejects(new Error(motorcycleNotFoundMessage));
        req.params = { id: successfulMotorcycleCreation.id };
        req.body = motorcycleUpdateInput;
        
        await new MotorcycleController().update(req, res, next);

        expect(next.calledOnce).to.deep.equal(true);
        expect(next.lastCall.lastArg).to.be.an('Error');
        expect(res.status.calledOnceWithExactly(404)).to.deep.equal(true);
        expect(res.json.calledOnceWithExactly({ message: motorcycleNotFoundMessage }))
          .to.deep.equal(true);
      });
    },
  );

  afterEach(Sinon.restore);
});