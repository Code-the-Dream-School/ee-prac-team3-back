const userModel = require("../models/userSchema");

/******************************************************************************
 * @addFavoriteQuiz
 * @route /api/v1/favorites/add
 * @method POST
 * @description add favorite quiz from the user in the favorites array in database
 * @body quizId
 * @returns favorites array
 *******************************************************************************/

//Add quiz as favorite
const addFavoriteQuiz = async (req, res) => {
  const { userId } = req.user;
  const { quizId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add quiz in the favorites array
    user.favorites.push(quizId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Quiz added to favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/******************************************************************************
 * @getUserFavoriteQuiz
 * @route /api/v1/favorites
 * @method GET
 * @description display favorites quizzes from the user
 * @body
 * @returns favorites array
 *******************************************************************************/

const getUserFavorites = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*************************************************************************************
 * @removeFavoriteQuiz
 * @route /api/v1/favorites/remove
 * @method POST
 * @description remove favorite quiz from the user in the favorites array in database
 * @body quizId
 * @returns message
 ************************************************************************************/

const removeFavoriteQuiz = async (req, res) => {
  const { userId } = req.user;
  const { quizId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete quiz from the favorite lists
    user.favorites.pull(quizId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Quiz removed from favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFavoriteQuiz,
  getUserFavorites,
  removeFavoriteQuiz,
};