'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const FormQuestion = models.FormQuestion
      FormQuestion.hasMany(AnswerOption)
    }
  }
  AnswerOption.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    formQuestionId: DataTypes.UUID,
    answerOptionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnswerOption',
  });
  return AnswerOption;
};