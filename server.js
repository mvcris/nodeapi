const express = require('express');
const Boot = require('./core/boot');

const app = express();

//Criando uma nova instancia da API
const api = new Boot(app);