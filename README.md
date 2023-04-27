# Projeto Car Shop

O projeto Car Shop se trata de uma API que gerencia veículos em um banco de dados **MongoDB**.

Utilizando Typescript, Express e Mongoose, a API foi construída pensando em respeitar os princípios **OOP* e **SOLID**, com classes e métodos genéricos, tipados, de responsabilidade única e abertos para extensão. Além disso, tentei aderir ao máximo às metodologias de [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) para melhor estruturação e leitura do flow de desenvolvimento.

É possível realizar operações CRUD para duas rotas diferentes: `/cars` e `/motorcycles`, tratando de veículos do tipo carro e moto, respectivamente.

Também foram desenvolvidos extensos testes unitários E de integração para todos os métodos das rotas.

Projeto realizado como parte da grade curricular do curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/)

## Tecnologias utilizadas

**NodeJS**, **Typescript**, **Express**, **Mongoose**, **Sinon**, **Chai**

## Instalação

Clone o projeto para sua máquina:

`$ git clone https://github.com/mhps-m/projeto-car-shop.git`


## Executando o projeto

  ### Requisitos
  - Node
  - Docker Compose

  > Suba os containers que vão executar a aplicação: 
  - `$ docker compose up -d`.
  - Lembre-se de parar qualquer serviço que estiver ocupando a porta `27017` (padrão), ou adapte no arquivo `docker-compose.yml`, para que o banco de dados possa inicializar.
  - Esses serviços irão inicializar dois containers: um para o **banco de dados**, e um para o **back-end**.
  - A partir daqui você pode fazer requisições para o back-end na porta `3001` (padrão).
  - Alternativamente, você pode rodar a aplicação localmente, basta parar o container do back-end com o comando `$ docker stop car_shop` e iniciar com o comando `$ npm start` ou `$ npm run dev`.

## Sobre mim

  Sou um desenvolvedor back-end sem experiência profissional a procura de uma oportunidade.
   - [LinkedIn](https://www.linkedin.com/in/miguel-soares-dev/)
