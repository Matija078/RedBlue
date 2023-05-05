const express = require('express');
const router = express.Router();
const {
  getUserById,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/user');

// Get a user by ID
router.get('/users/:id', getUserById);

// Update user profile
router.put('/users/:id', updateUserProfile);

// Delete user profile
router.delete('/users/:id', deleteUserProfile);

module.exports = router;

// User.js-filen definerer en Express-ruter for håndtering av brukerrelaterte forespørsler i backend.
// Ruteren er opprettet ved hjelp av express.Router().
// Kontrollerfunksjonene getUserById, updateUserProfile og deleteUserProfile for håndtering av brukerrelaterte oppgaver importeres fra user.js-filen i kontrollerkatalogen.
// Ruteren definerer tre ruter:
// GET /users/:id: henter brukeren med gitt ID.
// PUT /users/:id: oppdaterer brukerprofilen med gitt ID.
// DELETE /users/:id: sletter brukerprofilen med gitt ID.
// Rutene bruker kontrollfunksjonene getUserById, updateUserProfile og deleteUserProfile for å håndtere forespørslene og sende de riktige svarene.
// Ruteren eksporteres fra modulen.
