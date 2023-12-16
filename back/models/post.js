module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      img: DataTypes.STRING,
      date: DataTypes.DATE,
    });
    return Post;
  };
  