const Game = require('../models/Game');
const User = require('../models/User');

const startGame = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newGame = new Game({ userId, timeStart: new Date() });

    await newGame.save();

    res.status(201).json({ game: newGame });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const stopGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.timeStop = new Date();
    game.gameStatus = 'stopped';

    await game.save();

    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeGame = async (req, res) => {
  const gameId = req.params.id;
  const { scoreLife1, scoreLife2, scoreLife3 } = req.body;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.scoreLife1 = scoreLife1;
    game.scoreLife2 = scoreLife2;
    game.scoreLife3 = scoreLife3;
    game.scoreGame = scoreLife1 + scoreLife2 + scoreLife3;
    game.timeEnd = new Date();
    game.gameStatus = 'completed';

    await game.save();

    const user = await User.findById(game.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const maxScore = Math.max(user.maxScore || 0, game.scoreGame || 0);

    user.maxScore = maxScore;

    await user.save();

    res.status(200).json({ game, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startGame, stopGame, completeGame };

// Game.js-filen definerer tre kontrollerfunksjoner for håndtering av spillrelaterte oppgaver i backend.
// Spill- og brukermodellene importeres fra henholdsvis Game.js- og User.js-filene i modellkatalogen.
// StartGame-funksjonen oppretter et nytt spill i databasen med bruker-IDen til den for øyeblikket autentiserte brukeren og gjeldende dato og klokkeslett som starttidspunkt.
// Den sjekker først om brukeren finnes i databasen og returnerer en feil hvis det ikke er tilfelle.
//  Deretter oppretter den en ny spillforekomst og lagrer den i databasen. Til slutt sender den de nye spilldataene i svaret.
// StopGame-funksjonen stopper et spill i databasen basert på ID-en, som sendes som en forespørselsparameter.
// Den finner først spillet i databasen og returnerer en feil hvis den ikke eksisterer.
// Deretter oppdaterer den spilldataene med gjeldende dato og klokkeslett som stopptid og setter spillstatusen til "stoppet".
//  Til slutt sender den oppdaterte spilldata i svaret.
// Den komplette spillfunksjonen
