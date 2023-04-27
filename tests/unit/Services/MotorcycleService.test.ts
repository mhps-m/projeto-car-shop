import { expect } from 'chai';
import Sinon from 'sinon';
import { afterEach } from 'mocha';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { 
  motorcycleNotFoundMessage, 
  motorcycleUpdateInput, 
  correctMotorcycleInput, 
  getMotorcycles,
  invalidIdMessage, 
  successfulMotorcycleCreation,
  successfulMotorcycleUpdate, 
} from '../../mocks/Motorcycle.mock';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Testa a classe de serviço MotorcycleService', function () {
  describe('Testa a função "create", que cria uma novo moto no banco de dados', function () {
    it('Cria uma moto com sucesso', async function () {
      Sinon.stub(MotorcycleODM.prototype, 'create').resolves(successfulMotorcycleCreation);

      const newMotorcycle = await new MotorcycleService().create(correctMotorcycleInput);

      expect(newMotorcycle instanceof Motorcycle).to.deep.equal(true);
      expect(newMotorcycle).to.deep.equal(successfulMotorcycleCreation);
    });
  });

  describe('Testa a função "findAll", retornando as motos cadastradas', function () {
    it('Retorna as motos com sucesso', async function () {
      Sinon.stub(MotorcycleODM.prototype, 'findAll').resolves(getMotorcycles);

      const motorcycles = await new MotorcycleService().findAll();

      expect(motorcycles.every((motorcycle) => motorcycle instanceof Motorcycle))
        .to.deep.equal(true);
      expect(motorcycles).to.deep.equal(getMotorcycles);
    });
  });

  describe(
    'Testa a função "findById", retornando uma moto com id igual ao passado por parâmetro', 
    function () {
      it('Retorna uma moto com sucesso', async function () {
        Sinon.stub(MotorcycleODM.prototype, 'findById').resolves(successfulMotorcycleCreation);

        const motorcycle = await new MotorcycleService().findById(successfulMotorcycleCreation.id);

        expect(motorcycle).to.be.an.instanceOf(Motorcycle);
        expect(motorcycle).to.deep.equal(successfulMotorcycleCreation);
      });

      it('Retorna erro ao tentar passar um id com formato inválido', async function () {
        try {
          await new MotorcycleService().findById('Id inválido');
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(invalidIdMessage);
        }
      });

      it('Retorna erro ao não encontrar alguma moto correspondente', async function () {
        Sinon.stub(MotorcycleODM.prototype, 'findById').resolves(null);
        try {
          await new MotorcycleService().findById(successfulMotorcycleCreation.id);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(motorcycleNotFoundMessage);
        }
      });
    },
  );

  describe(
    'Testa a função "update", permitindo atualizar uma moto já cadastrada', 
    function () {
      it('Atualiza uma moto com sucesso', async function () {
        Sinon.stub(MotorcycleODM.prototype, 'update').resolves(successfulMotorcycleUpdate);

        const updatedMotorcycle = await new MotorcycleService()
          .update(successfulMotorcycleCreation.id, motorcycleUpdateInput);

        expect(updatedMotorcycle).to.be.an.instanceOf(Motorcycle);
        expect(updatedMotorcycle).to.deep.equal(successfulMotorcycleUpdate);
      });

      it('Retorna erro ao tentar passar um id com formato inválido', async function () {
        try {
          await new MotorcycleService().update('Id inválido', motorcycleUpdateInput);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(invalidIdMessage);
        }
      });

      it('Retorna erro ao não encontrar alguma moto correspondente', async function () {
        Sinon.stub(MotorcycleODM.prototype, 'update').resolves(null);
        try {
          await new MotorcycleService()
            .update(successfulMotorcycleCreation.id, motorcycleUpdateInput);
        } catch (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect((err as Error).message).to.deep.equal(motorcycleNotFoundMessage);
        }
      });
    },
  );

  afterEach(Sinon.restore);
});