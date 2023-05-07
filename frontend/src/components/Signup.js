import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../utils/api';

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(formData)
      .then((data) => {
        setUser(data);
        history.push('/game');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="signup-screen">
      <h1 className="title">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

// Registreringskomponenten er en funksjonell komponent som representerer registreringsskjermen til Red Blue-spillet.
// UseState-kroken brukes til å definere tilstandsvariablene for skjemadataene (navn, e-post, passord og kallenavn) og feilmelding.
// UseHistory-kroken brukes for å få tilgang til historikkobjektet til ruteren.
// HandleChange-funksjonen er en tilbakeringingsfunksjon som oppdaterer skjemadata når brukeren legger inn data i inndatafeltene.
// HandleSubmit-funksjonen er en tilbakeringingsfunksjon som sender en registreringsforespørsel til API når brukeren sender inn skjemaet.
// Hvis registreringen er vellykket, settes brukeren i tilstanden overordnet komponent (App.js) og omdirigeres til spillskjermen.
// Hvis registreringen mislykkes, vises en feilmelding.
// Returerklæringen inneholder JSX-koden for registreringsskjermen,
// som består av et skjema med fire inndatafelt (navn, e-post, passord og kallenavn), en feilmelding (hvis aktuelt) og en send-knapp.
//  Inndatafeltene og send-knappen er standard HTML-skjemaelementer, og feilmeldingen vises kun hvis det er en feil.
