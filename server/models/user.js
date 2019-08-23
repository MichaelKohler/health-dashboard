'use strict';

const bcrypt = require('bcrypt');

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
    password: DataTypes.STRING,
  }, {});

  User.prototype.checkValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password); // eslint-disable-line no-sync
  };

  User.associate = (models) => {
    User.belongsToMany(models.UserRole, { through: 'UserUserRole' });
  };

  return User;
};
