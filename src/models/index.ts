import { Sequelize } from 'sequelize';

// Config
import config from '../config';

const sequelize = new Sequelize(config.db.mysql_db , config.db.mysql_user, config.db.mysql_password, {
  host: config.db.mysql_host,
  dialect: config.db.mysql_dialect,
  define: {
    timestamps: false
  },
//   operatorsAliases: false,

  pool: {
    max: parseInt(config.db.mysql_pool.max),
    min: parseInt(config.db.mysql_pool.min),
    acquire: parseInt(config.db.mysql_pool.acquire),
    idle: parseInt(config.db.mysql_pool.idle)
  } 
});

const models: any = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

// List of models
models.users = require("./userModel").default(sequelize, Sequelize);
export default models;