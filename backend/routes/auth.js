const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');

// Signup a new user
router.post('/signup', signup);

// Login an existing user
router.post('/login', login);

module.exports = router;

// Auth.js-filen definerer en Express-ruter for håndtering av brukerautentiseringsrelaterte forespørsler i backend.
// Ruteren er opprettet ved hjelp av express.Router().
// Registrerings- og påloggingskontrollerfunksjonene for håndtering av brukerregistrerings- og påloggingsoppgaver importeres fra auth.js-filen i kontrollerkatalogen.
// Ruteren definerer to ruter:
// POST /auth/signup: registrerer en ny bruker med de gitte detaljene.
// POST /auth/login: logger på en eksisterende bruker med gitt e-post og passord.
// Rutene bruker funksjonene for registrering og pålogging for å håndtere forespørslene og sende de riktige svarene.
// Ruteren eksporteres fra modulen.
