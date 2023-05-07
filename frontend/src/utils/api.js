const API_BASE_URL = 'http://localhost:5000';

// User API endpoints
export const signup = (formData) =>
  fetch(`${API_BASE_URL}/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json());

export const login = (formData) =>
  fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json());

export const getUser = (userId) =>
  fetch(`${API_BASE_URL}/api/users/${userId}`).then((response) =>
    response.json()
  );

export const updateUser = (userId, formData) =>
  fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json());

export const deleteUser = (userId) =>
  fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
  }).then((response) => response.json());

// Game API endpoints
export const startGame = (userId) =>
  fetch(`${API_BASE_URL}/api/games/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

export const stopGame = (gameId, formData) =>
  fetch(`${API_BASE_URL}/api/games/${gameId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json());

export const getHighScores = () =>
  fetch(`${API_BASE_URL}/api/games/highscores`).then((response) =>
    response.json()
  );

//   API_BASE_URL-konstanten definerer basis-URLen til API-serveren.
// Registreringsfunksjonen sender en registreringsforespørsel til API-serveren med skjemadataene oppgitt som argument. Svaret returneres som et JSON-objekt.
// Påloggingsfunksjonen sender en påloggingsforespørsel til API-serveren med skjemadataene oppgitt som argument. Svaret returneres som et JSON-objekt.
// GetUser-funksjonen henter brukerdataene fra API-serveren for den gitte bruker-IDen. Svaret returneres som et JSON-objekt.
// UpdateUser-funksjonen sender en oppdateringsforespørsel til API-serveren med skjemadataene oppgitt som argument for den gitte bruker-IDen.
// Svaret returneres som et JSON-objekt.
// deleteUser-funksjonen sender en sletteforespørsel til API-serveren for den gitte bruker-IDen. Svaret returneres som et JSON-objekt.
// StartGame-funksjonen sender en startspillforespørsel til API-serveren for gitt bruker-ID. Svaret returneres som et JSON-objekt.
// StopGame-funksjonen sender en stopp-spillforespørsel til API-serveren for den gitte spill-IDen med skjemadataene oppgitt som argument.
// Svaret returneres som et JSON-objekt.
// GetHighScores-funksjonen henter data med høy poengsum fra API-serveren. Svaret returneres som et JSON-objekt.
