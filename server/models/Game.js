module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    metacritic: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    genres: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    esrb_rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Game.associate = (models) => {
    Game.belongsToMany(models.User, {
      through: "UserFavorites", // Name of the junction table
      foreignKey: "gameId", // Foreign key in UserFavorites referencing Game
      otherKey: "userId", // Foreign key in UserFavorites referencing User
      as: "usersWhoFavorited", // Alias for the association
    });
  };

  return Game;
};
