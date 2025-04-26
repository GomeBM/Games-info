module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorites: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [], // Array of Game IDs
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Game, {
      through: "UserFavorites", // Name of the junction table
      foreignKey: "userId", // Foreign key in UserFavorites referencing User
      otherKey: "gameId", // Foreign key in UserFavorites referencing Game
      as: "favoriteGames", // Alias for the association
    });
  };

  return User;
};
