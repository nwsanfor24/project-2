module.exports = function(sequelize, DataTypes) {
  const Image = sequelize.define("Image", {
    src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Image;
};
