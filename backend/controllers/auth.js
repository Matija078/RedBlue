const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { name, email, password, nickname } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      nickname,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = { registerUser, loginUser };
// Auth.js-filen definerer to kontrollerfunksjoner for håndtering av brukerautentiseringsoppgaver i backend.
// jwt- og bcryptjs-bibliotekene importeres for å generere og verifisere henholdsvis JSON Web Tokens og hashing-passord.
// Brukermodellen importeres fra User.js-filen i modellkatalogen.
// RegisterUser-funksjonen oppretter en ny bruker i databasen med dataene som er oppgitt i forespørselskroppen.
//  Den sjekker først om en bruker med samme e-post allerede eksisterer og returnerer en feil hvis det er tilfelle.
//  Deretter hashes brukerens passord og oppretter en ny brukerforekomst med hash-passordet. Etter å ha lagret brukeren til databasen,
//  genererer den et JSON Web Token og sender det sammen med brukerens data i svaret.
// LoginUser-funksjonen verifiserer brukerens legitimasjon (e-post og passord) og genererer et JSON Web Token hvis de er riktige.
//  Den sjekker først om en bruker med den oppgitte e-posten eksisterer og returnerer en feil hvis det ikke er tilfelle.
//   Deretter sammenligner den passordhashen som er lagret i databasen med det angitte passordet, og returnerer en feilmelding hvis de ikke samsvarer.
//    Til slutt genererer den et JSON Web Token og sender det sammen med brukerens data i svaret.
// Alle kontrollerfunksjoner håndterer eventuelle feil som kan oppstå under databaseoperasjoner og returnerer passende feilsvar.
