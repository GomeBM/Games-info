require("dotenv").config();
const db = require("./models");
const gameService = require("./services/gameService");

const syncGames = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");

    await db.sequelize.sync({ alter: true });
    console.log("✅ DB synced with updated schema");

    // First, fetch and save basic game info
    const games = await gameService.getAllGamesFromApi();
    await gameService.saveGamesToDB(games);
    console.log(`✅ Synced ${games.length} games from API`);

    //Now fetch detailed info for each game one by one
    console.log("Starting to fetch details for each game...");
    let successCount = 0;
    let failCount = 0;
    const DELAY_MS = 200;

    // Get all games from DB to ensure we have the latest data
    const allGames = await db.Game.findAll();
    console.log(
      `Found ${allGames.length} games in database to update with details`
    );

    for (let i = 0; i < allGames.length; i++) {
      const game = allGames[i];
      try {
        if (i % 10 === 0) {
          console.log(
            `Processing game ${i + 1}/${
              allGames.length
            } (${successCount} succeeded, ${failCount} failed)`
          );
        }

        const gameDetails = await gameService.getGameDetailsFromApi(game.id);
        const updated = await gameService.updateGameWithDetails(gameDetails);

        if (updated) {
          successCount++;
        } else {
          failCount++;
          console.warn(`Failed to update game ID ${game.id}`);
        }

        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      } catch (error) {
        console.error(`Error processing game ID ${game.id}:`, error);
        failCount++;
      }
    }

    console.log(
      `✅ Completed fetching details: ${successCount} succeeded, ${failCount} failed`
    );
  } catch (error) {
    console.error("❌ Sync failed:", error);
  } finally {
    process.exit();
  }
};

syncGames();
