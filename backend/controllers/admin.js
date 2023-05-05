const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, updateUser };
// Admin.js-filen definerer tre kontrollerfunksjoner for håndtering av admin-relaterte oppgaver i backend.
// Brukermodellen importeres fra User.js-filen i modellkatalogen.
// GetAllUsers-funksjonen henter alle brukere fra databasen og returnerer dataene deres, unntatt passord-hashene.
// DeleteUser-funksjonen sletter en bruker fra databasen basert på deres ID, som sendes som en forespørselsparameter.
// UpdateUser-funksjonen oppdaterer en brukers data i databasen basert på deres ID og dataene sendt i forespørselsteksten.
// Alle kontrollerfunksjoner håndterer eventuelle feil som kan oppstå under databaseoperasjoner og returnerer passende feilsvar.
