import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes,
} from 'sequelize';
import db from './instance';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;

  declare public first_name: string;

  declare public last_name: string;

  declare public phone_number: string;

  declare public email: string;

  declare public createdAt: string;

  declare public updatedAt: string;
}
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },

}, {
  modelName: 'User',
  sequelize: db.sequelize,
  timestamps: true,
});

export default User;
