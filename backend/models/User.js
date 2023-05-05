const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    maxScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

// User.js-filen definerer et Mongoose-skjema for brukermodellen, som representerer en bruker av applikasjonen.
// Skjemaet definerer følgende felt:
// navn: navnet på brukeren (obligatorisk).
// e-post: e-postadressen til brukeren (obligatorisk, unik).
// passord: passordet til brukeren (påkrevd).
// kallenavn: kallenavnet til brukeren (påkrevd).
// isAdmin: et flagg som indikerer om brukeren er en admin eller ikke (standard: usann).
// maxScore: den maksimale poengsummen oppnådd av brukeren i ethvert spill (standard: 0).
// tidsstempler: legger til feltene createAt og updatedAt til skjemaet, som automatisk administreres av Mongoose.
// Brukermodellen lages fra skjemaet ved å bruke mongoose.model() og eksporteres fra modulen
