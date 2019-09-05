'use strict';

module.exports = (sequelize, DataTypes) => {
  const Weight = sequelize.define('Weight', {
    weight: DataTypes.FLOAT,
  }, {});

  return Weight;
};
