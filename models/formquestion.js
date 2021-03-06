'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const Form = models.Form
      Form.hasMany(FormQuestion)
    }
  }
  FormQuestion.init({
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    order: DataTypes.INTEGER,
    formId: DataTypes.UUID,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    qType: DataTypes.STRING,
    FormOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FormQuestion',
  });
  return FormQuestion;
};