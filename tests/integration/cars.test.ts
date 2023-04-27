import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import request, { Response } from 'supertest';
import { afterEach } from 'mocha';
import app from '../../src/app';
import { 
  carNotFoundMessage,
  carValidationFailMessage,
  correctCarInput,
  getCars,
  invalidIdMessage,
  successfulCarCreation,
  carUpdateInput, 
  updatedCarInstance,
} from '../mocks/Car.mock';
import { carPaths } from '../../src/Routes/carRoutes';
import testStrings from '../utils/testStrings';

describe('Testes de integração dos endpoints da rota /cars', function () {
  let httpResponse: Response;

  describe('Testa o endpoint POST /cars, cadastrando um novo carro e o retornando', function () {
    it('Cadastra um carro com sucesso', async function () {
      Sinon.stub(Model, 'create').resolves(successfulCarCreation);

      httpResponse = await request(app)
        .post(carPaths.BASE)
        .send(correctCarInput);

      expect(httpResponse.status).to.deep.equal(201);
      expect(httpResponse.body).to.deep.equal(successfulCarCreation);
    });

    it('Retorna erro ao passar parâmetros incompletos', async function () {
      httpResponse = await request(app)
        .post(carPaths.BASE)
        .send({ model: 'Fiat Uno' });

      expect(httpResponse.status).to.deep.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(carValidationFailMessage);
    });

    it('Retorna erro ao passar parâmetros inválidos', async function () {
      httpResponse = await request(app)
        .post(carPaths.BASE)
        .send({ ...correctCarInput, year: [2021] });

      expect(httpResponse.status).to.deep.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(carValidationFailMessage);
    });
  });

  describe('Testa o endpoint GET /cars, retornando todos os carros cadastrados', function () {
    it('Retorna os carros com sucesso', async function () {
      Sinon.stub(Model, 'find').resolves(getCars);

      httpResponse = await request(app)
        .get(carPaths.BASE);

      expect(httpResponse.status).to.deep.equal(200);
      expect(httpResponse.body).to.deep.equal(getCars);
    });
  });

  describe('Testa o endpoint GET /cars/:id, retornando um carro com o id passado', function () {
    it('Retorna um carro com sucesso', async function () {
      Sinon.stub(Model, 'findById').resolves(successfulCarCreation);

      httpResponse = await request(app)
        .get(`${carPaths.BASE}/${successfulCarCreation.id}`);

      expect(httpResponse.status).to.deep.equal(200);
      expect(httpResponse.body).to.deep.equal(successfulCarCreation);
    });

    it(testStrings.invalidIdTestDesc, async function () {
      httpResponse = await request(app)
        .get(`${carPaths.BASE}/${testStrings.invalidId}`);

      expect(httpResponse.status).to.deep.equal(422);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(invalidIdMessage);
    });

    it(`${testStrings.notFoundTestDesc} um carro`, async function () {
      Sinon.stub(Model, 'findById').resolves(null);

      httpResponse = await request(app)
        .get(`${carPaths.BASE}/${successfulCarCreation.id}`);

      expect(httpResponse.status).to.deep.equal(404);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(carNotFoundMessage);
    });
  });

  describe('Testa o endpoint PUT /cars/:id, atualizando um carro no banco de dados', function () {
    it('Atualiza um carro com sucesso', async function () {
      Sinon
        .stub(Model, 'findByIdAndUpdate')
        .resolves({ ...successfulCarCreation, status: true });

      httpResponse = await request(app)
        .put(`${carPaths.BASE}/${successfulCarCreation.id}`)
        .send(carUpdateInput);

      expect(httpResponse.status).to.deep.equal(200);
      expect(httpResponse.body).to.deep.equal(updatedCarInstance);
    });

    it(testStrings.invalidIdTestDesc, async function () {
      httpResponse = await request(app)
        .put(`${carPaths.BASE}/${testStrings.invalidId}`)
        .send(carUpdateInput);

      expect(httpResponse.status).to.deep.equal(422);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(invalidIdMessage);
    });

    it(`${testStrings.notFoundTestDesc} um carro`, async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      httpResponse = await request(app)
        .put(`${carPaths.BASE}/${successfulCarCreation.id}`)
        .send(carUpdateInput);

      expect(httpResponse.status).to.deep.equal(404);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(carNotFoundMessage);
    });
  });

  describe('Testa o endpoint DELETE /cars/:id, deletando um carro no banco de dados', function () {
    it('Deleta um carro com sucesso', async function () {
      Sinon
        .stub(Model, 'findByIdAndDelete')
        .resolves(successfulCarCreation);

      httpResponse = await request(app)
        .delete(`${carPaths.BASE}/${successfulCarCreation.id}`);

      expect(httpResponse.status).to.deep.equal(204);
      expect(httpResponse.body).to.deep.equal({});
    });

    it(testStrings.invalidIdTestDesc, async function () {
      httpResponse = await request(app)
        .delete(`${carPaths.BASE}/${testStrings.invalidId}`);

      expect(httpResponse.status).to.deep.equal(422);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(invalidIdMessage);
    });

    it(`${testStrings.notFoundTestDesc} um carro`, async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);

      httpResponse = await request(app)
        .delete(`${carPaths.BASE}/${successfulCarCreation.id}`);

      expect(httpResponse.status).to.deep.equal(404);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.include(carNotFoundMessage);
    });
  });
  
  afterEach(Sinon.restore);
});