module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Song);
    User.hasMany(models.Image);
  };

  return User;
};
