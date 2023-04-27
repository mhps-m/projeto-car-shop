import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import request, { Response } from 'supertest';
import { afterEach } from 'mocha';
import app from '../../src/app';
import { 
  motorcycleNotFoundMessage,
  motorcycleValidationFailMessage,
  correctMotorcycleInput,
  getMotorcycles,
  invalidIdMessage,
  successfulMotorcycleCreation,
  motorcycleUpdateInput,
  updatedMotorcycleInstance,
} from '../mocks/Motorcycle.mock';
import { motorcyclePaths } from '../../src/Routes/motorcycleRoutes';
import testStrings from '../utils/testStrings';

describe('Testes de integração dos endpoints da rota /motorcycles', function () {
  let httpResponse: Response;

  describe(
    'Testa o endpoint POST /motorcycles, cadastrando uma novo moto e a retornando', 
    function () {
      it('Cadastra uma moto com sucesso', async function () {
        Sinon.stub(Model, 'create').resolves(successfulMotorcycleCreation);

        httpResponse = await request(app)
          .post(motorcyclePaths.BASE)
          .send(correctMotorcycleInput);

        expect(httpResponse.status).to.deep.equal(201);
        expect(httpResponse.body).to.deep.equal(successfulMotorcycleCreation);
      });

      it('Retorna erro ao passar parâmetros incompletos', async function () {
        httpResponse = await request(app)
          .post(motorcyclePaths.BASE)
          .send({ model: 'Fiat Uno' });

        expect(httpResponse.status).to.deep.equal(400);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(motorcycleValidationFailMessage);
      });

      it('Retorna erro ao passar parâmetros inválidos', async function () {
        httpResponse = await request(app)
          .post(motorcyclePaths.BASE)
          .send({ ...correctMotorcycleInput, year: [2021] });

        expect(httpResponse.status).to.deep.equal(400);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(motorcycleValidationFailMessage);
      });
    },
  );

  describe(
    'Testa o endpoint GET /motorcycles, retornando todas as motos cadastradas', 
    function () {
      it('Retorna as motos com sucesso', async function () {
        Sinon.stub(Model, 'find').resolves(getMotorcycles);

        httpResponse = await request(app)
          .get(motorcyclePaths.BASE);

        expect(httpResponse.status).to.deep.equal(200);
        expect(httpResponse.body).to.deep.equal(getMotorcycles);
      });
    },
  );

  describe(
    'Testa o endpoint GET /motorcycles/:id, retornando uma moto com o id passado', 
    function () {
      it('Retorna uma moto com sucesso', async function () {
        Sinon.stub(Model, 'findById').resolves(successfulMotorcycleCreation);

        httpResponse = await request(app)
          .get(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`);

        expect(httpResponse.status).to.deep.equal(200);
        expect(httpResponse.body).to.deep.equal(successfulMotorcycleCreation);
      });

      it(testStrings.invalidIdTestDesc, async function () {
        httpResponse = await request(app)
          .get(`${motorcyclePaths.BASE}/${testStrings.invalidId}`);

        expect(httpResponse.status).to.deep.equal(422);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(invalidIdMessage);
      });

      it(`${testStrings.notFoundTestDesc} uma moto`, async function () {
        Sinon.stub(Model, 'findById').resolves(null);

        httpResponse = await request(app)
          .get(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`);

        expect(httpResponse.status).to.deep.equal(404);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(motorcycleNotFoundMessage);
      });
    },
  );

  describe(
    'Testa o endpoint PUT /motorcycles/:id, atualizando uma moto no banco de dados',
    function () {
      it('Atualiza uma moto com sucesso', async function () {
        Sinon
          .stub(Model, 'findByIdAndUpdate')
          .resolves({ ...successfulMotorcycleCreation, status: true });

        httpResponse = await request(app)
          .put(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`)
          .send(motorcycleUpdateInput);

        expect(httpResponse.status).to.deep.equal(200);
        expect(httpResponse.body).to.deep.equal(updatedMotorcycleInstance);
      });

      it(testStrings.invalidIdTestDesc, async function () {
        httpResponse = await request(app)
          .put(`${motorcyclePaths.BASE}/${testStrings.invalidId}`)
          .send(motorcycleUpdateInput);

        expect(httpResponse.status).to.deep.equal(422);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(invalidIdMessage);
      });

      it(`${testStrings.notFoundTestDesc} uma moto`, async function () {
        Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

        httpResponse = await request(app)
          .put(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`)
          .send(motorcycleUpdateInput);

        expect(httpResponse.status).to.deep.equal(404);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(motorcycleNotFoundMessage);
      });
    },
  );

  describe(
    'Testa o endpoint DELETE /motorcycles/:id, deletando uma moto no banco de dados', 
    function () {
      it('Deleta uma moto com sucesso', async function () {
        Sinon
          .stub(Model, 'findByIdAndDelete')
          .resolves(successfulMotorcycleCreation);

        httpResponse = await request(app)
          .delete(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`);

        expect(httpResponse.status).to.deep.equal(204);
        expect(httpResponse.body).to.deep.equal({});
      });

      it(testStrings.invalidIdTestDesc, async function () {
        httpResponse = await request(app)
          .delete(`${motorcyclePaths.BASE}/${testStrings.invalidId}`);

        expect(httpResponse.status).to.deep.equal(422);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(invalidIdMessage);
      });

      it(`${testStrings.notFoundTestDesc} uma moto`, async function () {
        Sinon.stub(Model, 'findByIdAndDelete').resolves(null);

        httpResponse = await request(app)
          .delete(`${motorcyclePaths.BASE}/${successfulMotorcycleCreation.id}`);

        expect(httpResponse.status).to.deep.equal(404);
        expect(httpResponse.body).to.haveOwnProperty('message');
        expect(httpResponse.body.message).to.include(motorcycleNotFoundMessage);
      });
    },
  );
  
  afterEach(Sinon.restore);
});