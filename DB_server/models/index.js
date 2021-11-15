const path = require("path");
const Sequelize = require("sequelize");

// Model 불러오기
const Users = require("./users");
const Assets = require("./assets");
const Comments = require("./comments");

const env = process.env.NODE_ENV || "development";

// MySQL connection setting
const config = require("../config/config")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db 객체에 모든 테이블 넣기
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = Users;
db.Assets = Assets;
db.Comments = Comments;

// MySQL에 모델 넣기
Users.init(sequelize);
Assets.init(sequelize);
Comments.init(sequelize);

// 관계형 설정
Users.associate(db);
Assets.associate(db);
Comments.associate(db);

module.exports = db;