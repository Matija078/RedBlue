const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

// Config.js-filen eksporterer et objekt som inneholder konfigurasjonsalternativer for applikasjonen.
// Dotenv-pakken brukes til å laste miljøvariabler fra en .env-fil.
// Det eksporterte objektet inneholder følgende egenskaper:
// PORT: portnummeret som skal brukes for serveren. Standard er 5000 hvis det ikke er spesifisert i .env-filen.
// MONGODB_URI: URIen for MongoDB-databasen å koble til. Dette bør spesifiseres i .env-filen.
// JWT_SECRET: den hemmelige nøkkelen som skal brukes for generering og validering av JWT-tokener. Dette bør spesifiseres i .env-filen.
// Det eksporterte objektet kan importeres til andre moduler etter behov.
