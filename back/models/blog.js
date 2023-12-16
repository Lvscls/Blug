module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        autor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
      });
    return Blog;
  };