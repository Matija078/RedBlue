const express = require('express');
const router = express.Router();
const {
  createGame,
  getGamesByUser,
  updateGame,
} = require('../controllers/game');

// Create a new game
router.post('/games', createGame);

// Get all games played by a user
router.get('/games/:userId', getGamesByUser);

// Update a game by ID
router.put('/games/:id', updateGame);

module.exports = router;

// Game.js-filen definerer en Express-ruter for håndtering av spillrelaterte forespørsler i backend.
// Ruteren er opprettet ved hjelp av express.Router().
// CreateGame-, getGamesByUser- og updateGame-kontrollerfunksjonene for håndtering av spillrelaterte oppgaver importeres fra game.js-filen i kontrollerkatalogen.
// Ruteren definerer tre ruter:
// POST /games: oppretter et nytt spill med de angitte detaljene.
// GET /games/:userId: henter alle spill spilt av brukeren med gitt ID.
// PUT /games/:id: oppdaterer et spill med gitt ID.
// Rutene bruker funksjonene createGame, getGamesByUser og updateGame-kontroller for å håndtere forespørslene og sende de riktige svarene.
// Ruteren eksporteres fra modulen
