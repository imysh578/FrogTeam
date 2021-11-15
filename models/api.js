// asset으로 수정할 부분

const Sequelize = require("sequelize");

module.exports = class Api extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        upbitAccess: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        upbitSecret: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        binanceAccess: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        binanceSecret: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Api",
        tableName: "apis",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Api.belongsTo(db.User, { foreignKey: "아무이름", targetKey: "id" });
  }
};
