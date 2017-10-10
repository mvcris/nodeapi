//Arquivo gerado pelo sequelize cli para fazer a importacao e sincronizacao das models automaticamente

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
const config = require('../config/config');
var basename  = path.basename(__filename);
var db        = {};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
   host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
