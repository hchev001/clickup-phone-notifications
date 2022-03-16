import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes,
} from 'sequelize';
import db from './instance';

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<string>;

  declare public name: string;

  declare public description: string | null;

  declare public status: string;

  declare public date_created: number;

  declare public date_updated: number;

  declare public due_date: string;

  declare public assignees: any;

  declare public url: string;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Task.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  date_created: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  date_updated: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  assignees: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  due_date: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  modelName: 'Task',
  sequelize: db.sequelize,
  timestamps: true,
});

export default Task;
