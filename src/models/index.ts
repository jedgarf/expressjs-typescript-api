import * as settings from '../config/settings.config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(settings.mysql_db , settings.mysql_user, settings.mysql_password, {
  host: settings.mysql_host,
  dialect: settings.mysql_dialect,
  define: {
    timestamps: false
  },
//   operatorsAliases: false,

  pool: {
    max: parseInt(settings.mysql_pool.max),
    min: parseInt(settings.mysql_pool.min),
    acquire: parseInt(settings.mysql_pool.acquire),
    idle: parseInt(settings.mysql_pool.idle)
  } 
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// List of models
db.userModel = require("./userModel").default(sequelize, Sequelize);
export default db;