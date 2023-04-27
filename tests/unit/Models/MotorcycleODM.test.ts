import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import { afterEach } from 'mocha';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { 
  motorcycleUpdateInput,
  correctMotorcycleInput,
  getMotorcycles,
  successfulMotorcycleCreation,
} from '../../mocks/Motorcycle.mock';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Testa a classe de modelo MotorcycleODM', function () {
  describe('Testa a função "create", permitindo criar uma nova moto', function () {
    it('Cria uma moto com sucesso', async function () {
      Sinon.stub(Model, 'create').resolves(successfulMotorcycleCreation);

      const newMotorcycle = await new MotorcycleODM().create(correctMotorcycleInput);

      expect(newMotorcycle).to.deep.equal(successfulMotorcycleCreation);
    });

    it('Retorna erro ao tentar cadastrar uma moto com valores incorretos', async function () {
      try {
        await new MotorcycleODM().create({} as IMotorcycle);
      } catch (err) {
        expect(err).to.be.an('Error');
        expect((err as Error).message).to.include('Motorcycle validation failed');
      }
    });
  });

  describe('Testa a função "findAll", retornando todas as motos cadastradas', function () {
    it('Retorna as motos com sucesso', async function () {
      Sinon.stub(Model, 'find').resolves(getMotorcycles);

      const motorcycles = await new MotorcycleODM().findAll();

      expect(motorcycles).to.deep.equal(getMotorcycles);
    });
  });

  describe(
    'Testa a função "findById", retornando uma moto cujo id seja igual ao passado como parâmetro',
    function () {
      it('Retorna uma moto com sucesso', async function () {
        Sinon.stub(Model, 'findById').resolves(successfulMotorcycleCreation);

        const motorcycle = await new MotorcycleODM().findById('644846a28fec17ed845b29ca');

        expect(motorcycle).to.deep.equal(successfulMotorcycleCreation);
      });

      it('Retorna erro ao passar um id com formato inválido', async function () {
        try {
          await new MotorcycleODM().findById('Id inválido');
        } catch (err) {
          expect(err).to.be.an('Error');
          expect((err as Error).message).to.include('Cast to ObjectId failed');
        }
      });
    },
  );

  describe(
    'Testa a função "update", permitindo atualizar os dados de uma moto cadastrada',
    function () {
      it('Atualiza uma moto com sucesso', async function () {
        Sinon
          .stub(Model, 'findByIdAndUpdate')
          .resolves({ ...successfulMotorcycleCreation, status: true });

        const updatedMotorcycle = await new MotorcycleODM()
          .update(successfulMotorcycleCreation.id, motorcycleUpdateInput);

        expect(updatedMotorcycle).to.deep.equal({ ...successfulMotorcycleCreation, status: true });
      });
    },
  );

  describe(
    'Testa a função "delete", permitindo deletar uma moto cadastrada',
    function () {
      it('Deleta uma moto com sucesso', async function () {
        Sinon.stub(Model, 'findByIdAndDelete').resolves(successfulMotorcycleCreation);

        const deletedMotorcycle = await new MotorcycleODM().delete(successfulMotorcycleCreation.id);

        expect(deletedMotorcycle).to.deep.equal(successfulMotorcycleCreation);
      });
    },
  );

  afterEach(Sinon.restore);
});