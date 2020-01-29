const rotas = require('./routes/rotas');


const express = require('express');
const Aplicacao = express();

Aplicacao.use (express.json());

Aplicacao.use((req,res, next) =>{ //middleware global
  console.count('Requests');
  return next();
});

Aplicacao.use (rotas);

Aplicacao.listen(3000);