"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spec.belongsTo(models.Car, {
        foreignKey: "carId",
      });
    }
  }
  Spec.init(
    {
      carId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      spec: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spec",
    }
  );
  return Spec;
};
