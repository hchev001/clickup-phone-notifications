import { Model } from 'sequelize';

interface UserAttributes {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id?: string;

    public first_name: string;

    public last_name: string;

    public phone_number: string;

    public email: string;

    public createdAt?: string;

    public updatedAt?: string;
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

  }, {
    modelName: 'User',
    sequelize,
  });

  return User;
};
