// auth.js

// Function to check if user is logged in
export const isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;
};

// Function to set user data in local storage
export const setUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('token', userData.token);
};

// Function to get user data from local storage
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Function to remove user data from local storage
export const removeUserData = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('token');
};

// Denne koden eksporterer fire funksjoner for brukerautentisering:
// isLoggedIn: sjekker om en bruker er pålogget ved å se etter et token i lokal lagring.
// setUserData: setter brukerdata i lokal lagring, inkludert token.
// getUserData: henter brukerdata fra lokal lagring.
// removeUserData: fjerner brukerdata fra lokal lagring, inkludert token.
