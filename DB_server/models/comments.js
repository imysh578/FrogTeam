const Sequelize = require("sequelize");

module.exports = class Comments extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_num: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        team_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        writer_id: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        contents: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        count_views: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comments",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comments.belongsTo(db.Users, {
      foreignKey: "email",
      targetKey: "email",
    });
  }
};
