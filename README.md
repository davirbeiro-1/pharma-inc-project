# pharma-inc-project

Projeto criado com intuito exclusivo de aprendizado. 

Nesse projeto utilizei as seguintes tecnologias:
* NodeJs com Express
* MongoDB
* VueJs

Nesse projeto é possível verificar a listagem de usuários, e ao selecionar uma determinada ação, é possível editar os dados dos usuários.

## Server-side

Para rodar esse projeto é necessário ter instalado o Node.js 16.0 e seguir esses passos:

```bash
cd server-side
npm install
npm start
```

Após isso é necessário fazer uma requisição POST para o endereço "localhost:3000/v1/users/" com o intuito de alimentar o banco de dados.

## Client-side

O front-end foi construído usado VueJs, e para rodar é necessário ter uma versão Node Js até 16 e para iniciar é só executar os seguintes passos:

```bash
cd client-side
yarn install
yarn serve
```

