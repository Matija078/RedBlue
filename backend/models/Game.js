const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeStop: {
      type: Date,
    },
    timeEnd: {
      type: Date,
    },
    scoreLife1: {
      type: Number,
      default: 0,
    },
    scoreLife2: {
      type: Number,
      default: 0,
    },
    scoreLife3: {
      type: Number,
      default: 0,
    },
    scoreGame: {
      type: Number,
      default: 0,
    },
    gameStatus: {
      type: String,
      enum: ['started', 'stopped', 'completed'],
      default: 'started',
    },
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

//Game.js-filen definerer et Mongoose-skjema for spillmodellen, som representerer et spill som spilles av en bruker.
//Skjemaet definerer følgende felt:
//userId: IDen til brukeren som spilte spillet (påkrevd).
//timeStart: datoen og klokkeslettet da spillet startet (obligatorisk).
//timeStop: datoen og klokkeslettet da spillet ble stoppet (valgfritt).
//timeEnd: datoen og klokkeslettet da spillet ble fullført (valgfritt).
//scoreLife1: varigheten i sekunder av det første livet (standard: 0).
//scoreLife2: varigheten i sekunder av det andre livet (standard: 0).
//scoreLife3: varigheten i sekunder av det tredje livet (standard: 0).
//scoreGame: den totale poengsummen for spillet, som er summen av scoreLife1, scoreLife2 og scoreLife3 (standard: 0).
//gameStatus: statusen til spillet, som kan være "startet", "stoppet" eller "fullført" (standard: "startet").
//tidsstempel: legger til feltene createAt og updatedAt til skjemaet, som automatisk administreres av Mongoose.
//Spillmodellen lages fra skjemaet ved å bruke mongoose.model() og eksporteres fra modulen.
