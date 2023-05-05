const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, nickname } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.nickname = nickname || user.nickname;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
// User.js-filen definerer fire kontrollerfunksjoner for håndtering av brukerrelaterte oppgaver i backend.
// Brukermodellen importeres fra User.js-filen i modellkatalogen.
// GetUsers-funksjonen henter alle brukere fra databasen og sender dem i svaret.
// GetUserById-funksjonen henter en bruker fra databasen basert på IDen, som sendes som en forespørselsparameter.
// Den finner først brukeren i databasen og returnerer en feil hvis den ikke eksisterer. Deretter sender den brukerdataene i svaret.
// UpdateUser-funksjonen oppdaterer en bruker i databasen basert på dens ID, som sendes som en forespørselsparameter,
//  og de nye dataene som er oppgitt i forespørselskroppen. Den finner først brukeren i databasen og returnerer en feil hvis den ikke eksisterer.
//  Deretter oppdaterer den brukerdataene med de nye dataene og lagrer dem i databasen. Til slutt sender den oppdaterte brukerdata i svaret.
// DeleteUser-funksjonen sletter en bruker fra databasen basert på dens ID, som sendes som en forespørselsparameter.
// Den finner først brukeren i databasen og returnerer en feil hvis den ikke eksisterer.
// Deretter fjerner den brukeren fra databasen og sender en suksessmelding i svaret.
