'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV;
var config    = require(path.join(__dirname + './../config/config.json'))[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, {
    username: config["username"],
    password: config["password"],
    database: config["database"],
    host: config["host"],
    dialect: config["dialect"],
    timezone: config["timezone"],

    dialectOptions: {
      useUTC: false,
      dateStrings: true,

      typeCast: function(field,next) {
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next();
      },
    },
    timezone: '+09:00'
  });
}

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
