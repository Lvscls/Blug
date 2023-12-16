module.exports = (sequelize, DataTypes) => {
    const Blacklist = sequelize.define('Blacklist', {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      });
    return Blacklist;
  };