'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Coinslot', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    emplacement: DataTypes.STRING,
    money: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN
  });
}
