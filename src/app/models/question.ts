'use strict';

import  {Model} from "sequelize";


interface QuestionAttributes {
  id: number;
  title: string;
  content: string;
  userId: string;
}

module.exports = (sequelize: any, DataTypes:any) => {
  class Question extends Model<QuestionAttributes> implements QuestionAttributes {
    id!: number;
    title!: string;
    content!: string;
    userId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {foreignKey:'userId'})
      this.hasMany(models.Answer, {sourceKey:'id',foreignKey:'questionId',as:'answers'})
      this.hasMany(models.Subscription, {sourceKey:'id',foreignKey:'questionId',as:'subscriptions'})
    }
  };
  Question.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true,
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
    {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};