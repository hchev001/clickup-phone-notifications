import path from 'path';
import { Sequelize } from 'sequelize';
import models from './index';

const config = require(`${__dirname}/../../config/database.js`);

// let sequelize: { import: (arg0: any) => any; };
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    logQueryParameters: true,
  },
);

// console.log(basename);
// console.log(__dirname);
// fs
//   .readdirSync(__dirname)
//   .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
//   .forEach((file: any) => {
//     // console.log(file);
//     const model:any = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     if (model?.name) {
//       db[model.name] = model;
//     }
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

const db = {
  sequelize,
  Sequelize,
};

export default db;
