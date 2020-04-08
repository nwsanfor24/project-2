module.exports = function(sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorite;
};
