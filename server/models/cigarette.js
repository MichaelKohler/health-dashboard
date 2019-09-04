'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cigarette = sequelize.define('Cigarette', {
    rolled: DataTypes.BOOLEAN,
  }, {});

  return Cigarette;
};
