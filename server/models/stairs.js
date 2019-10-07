'use strict';

module.exports = (sequelize, DataTypes) => {
  const Stairs = sequelize.define('Stairs', {
    stairs: DataTypes.INTEGER,
  }, {});

  return Stairs;
};
