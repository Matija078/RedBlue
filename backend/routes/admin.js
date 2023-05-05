const express = require('express');
const router = express.Router();
const { deleteUser, updateUser } = require('../controllers/user');

// Update user by ID
router.put('/users/:id', updateUser);

// Delete user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;

// Admin.js-filen definerer en Express-ruter for håndtering av admin-relaterte forespørsler i backend.
// Ruteren er opprettet ved hjelp av express.Router().
// UpdateUser- og deleteUser-kontrollerfunksjonene for håndtering av brukerrelaterte oppgaver importeres fra user.js-filen i controllers-katalogen.
// Ruteren definerer to ruter:
// PUT /admin/users/:id: oppdaterer en bruker etter sin ID.
// SLETT /admin/users/:id: sletter en bruker med ID.
// Rutene bruker funksjonene updateUser og deleteUser kontroller for å håndtere forespørslene og sende de riktige svarene.
// Ruteren eksporteres fra modulen.
