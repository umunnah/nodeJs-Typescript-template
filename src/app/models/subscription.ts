'use strict';
import  {Model} from "sequelize";


interface SubscriptionAttributes {
  id: number;
  userId: string;
  questionId: number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes  {
    id!: number;
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
    }
  };
  Subscription.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true,
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
    modelName: 'Subscription',
  });
  return Subscription;
};