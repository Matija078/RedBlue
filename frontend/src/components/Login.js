import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../utils/api';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData)
      .then((data) => {
        setUser(data);
        history.push('/game');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-screen">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <div className="error">{error}</div>}
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// Påloggingskomponenten er en funksjonell komponent som representerer påloggingsskjermen til Red Blue-spillet.
// UseState-kroken brukes til å definere tilstandsvariablene for skjemadata (e-post og passord) og feilmelding.
// UseHistory-kroken brukes for å få tilgang til historikkobjektet til ruteren.
// HandleChange-funksjonen er en tilbakeringingsfunksjon som oppdaterer skjemadata når brukeren legger inn data i inndatafeltene.
// HandleSubmit-funksjonen er en tilbakeringingsfunksjon som sender en påloggingsforespørsel til API når brukeren sender inn skjemaet.
// Hvis påloggingen er vellykket, settes brukeren i tilstanden overordnet komponent (App.js) og omdirigeres til spillskjermen.
// Hvis påloggingen mislykkes, vises en feilmelding.
// Returerklæringen inneholder JSX-koden for påloggingsskjermen, som består av et skjema med to inndatafelt (e-post og passord),
// en feilmelding (hvis aktuelt) og en send-knapp. Inndatafeltene og send-knappen er standard HTML-skjemaelementer,
//  og feilmeldingen vises kun hvis det er en feil.
