"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Question, { sourceKey: 'id', foreignKey: 'userId', as: 'questions' }),
                this.hasMany(models.Answer, { sourceKey: 'id', foreignKey: 'userId', as: 'answers' });
            this.hasMany(models.Vote, { sourceKey: 'id', foreignKey: 'userId', as: 'votes' });
            this.hasMany(models.Subscription, { sourceKey: 'id', foreignKey: 'userId', as: 'subscriptions' });
        }
        toJSON() {
            return { ...this.get(), password: undefined };
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
