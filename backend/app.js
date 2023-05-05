const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const adminRoutes = require('./routes/admin');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB database connected successfully'));

// Use routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/', gameRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// App.js-filen oppretter en Express-app og setter opp mellomvare og ruter for å håndtere forespørsler i backend.
// Dotenv-pakken brukes til å laste miljøvariabler fra en .env-fil.
// Appen bruker cors-mellomvare for å tillate forespørsler på tvers av opprinnelse.
// Appen kobles til en MongoDB-database ved å bruke mongoose-pakken og miljøvariabelen MONGODB_URI.
// Appen setter opp rutene ved å bruke ruterobjektene authRoutes, userRoutes, gameRoutes og adminRoutes som er definert i rutekatalogen.
// Appen starter serveren og lytter på en port definert av PORT-miljøvariabelen, eller er standard til port 5000.
// Appen eksporterer appobjektet for å brukes av andre moduler.
