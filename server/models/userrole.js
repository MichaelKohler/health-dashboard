'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING
  }, {});

  UserRole.associate = models => {
    UserRole.belongsToMany(models.User, { through: 'UserUserRole' });
  };

  return UserRole;
};
