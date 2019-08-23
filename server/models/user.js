'use strict';

const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = (models) => {
    User.belongsToMany(models.UserRole, { through: 'UserUserRole' });
  };

  return User;
};
