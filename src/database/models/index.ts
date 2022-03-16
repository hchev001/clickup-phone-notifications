import User from './user.model';
import Task from './task.model';

const models = {
  User,
  Task,
};

// relations
User.belongsToMany(Task, { through: 'UserTasks' });
Task.belongsToMany(User, { through: 'UserTasks' });

export default models;
