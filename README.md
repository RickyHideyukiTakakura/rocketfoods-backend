# Rocketfoods

### Projeto que simula um restaurante, desenvolvido para o desafio final do Explorer da Rocketseat

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [Knex](https://knexjs.org/)
- [JWT](https://jwt.io/)
- Multer
- Sqlite

## Instalação

1. git clone https://github.com/RickyHideyukiTakakura/rocketfoods-backend
2. cd rocketfoods-backend
3. npm install ou yarn install

## Uso do Projeto

Este é o backend de um site que simula um restaurante, onde um administrador tem permissões para criar, editar e remover um prato. A seguir, você encontrá mais instruções sobre as principais funcionalidades:

### 1. Rodar o servidor na máquina local

#### Para rodar na maquina local:

1. cd rocketfoods-backend
2. npm run dev

### 2. Para fim de testes:

- Você pode encontrar o arquivo JSON [aqui](/rocketfoods-backend.json).
- Utilizei o Insomnia para os teste.

### 3. Controllers

1. DishesController

   1.1 Aqui estão as funcionalidades para criar, atualizar, remover e listar um prato.

2. DishImageController

   2.1 Aqui estão as funcionalidades para criar, atualizar as imagens do prato.

3. IngredientsController

   3.1 Aqui está a funcionalidade para listar os ingredientes de um prato específico.

4. SessionsController

   4.1 Aqui está a funcionalidade para logar um usuário no sistema.

5. UsersController

   5.1 Aqui está a funcionalidade para criar e atualizar um usuário.

### 4. Rotas

1. Dishes

   1.1 POST - "/image" - responsável pelo upload da imagem na criação de um prato.

   1.2 POST - "/" - responsável pela criação de um prato.

   1.3 PUT - "/:id" - responsável pela edição de um prato.

   1.4 DELETE - "/:id" - responsável pela exclusão de um prato.

   1.5 GET - "/:id" - responsável por listar um prato em específico.

   1.6 GET - "/" - responsável por listar todos os pratos.

   1.7 PATCH - "/:dish_id/image" - responsável por atualizar a imagem de um prato.

2. Users

   2.1 POST - "/" - responsável pela criação de um usuário.

3. Sessions

   3.1 POST - "/" - responsável por logar um usuário no sistema.

4. Ingredients

   4.1 GET - "/:dish_id" - responsável por listar os ingredientes de um prato.

### 5. Middlewares

1. Autenticação

   1.1 Verifica se o token JWT do usuário é válido.

2. Autorização

   2.1 Verifica se o usuário tem permissão para acessar alguma funcionalidade.
