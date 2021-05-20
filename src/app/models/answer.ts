'use strict';
import  {Model} from "sequelize";


interface AnswerAttributes {
  id: number;
  content: string;
  userId: string;
  questionId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Answer extends Model<AnswerAttributes> implements AnswerAttributes {
    id!: number;
    content!: string;
    userId!: string;
    questionId!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.belongsTo(models.User, {foreignKey:'userId'})
      this.belongsTo(models.Question, {foreignKey:'questionId'})
      this.hasMany(models.Vote, {sourceKey:'id',foreignKey:'answerId',as:'votes'})
    }
  };
  Answer.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true,
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};