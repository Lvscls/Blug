const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../database.sqlite",
});

const models = {
  User: require("./user")(sequelize, Sequelize.DataTypes),
  Blog: require("./blog")(sequelize, Sequelize.DataTypes),
  Post: require("./post")(sequelize, Sequelize.DataTypes),
  Blacklist: require("./blacklist")(sequelize, Sequelize.DataTypes),
};

models.Blog.belongsTo(models.User);
models.User.hasOne(models.Blog);
models.Post.belongsTo(models.Blog);
models.Blog.hasMany(models.Post);

module.exports = { sequelize, ...models };
