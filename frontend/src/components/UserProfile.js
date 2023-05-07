import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser, updateUser } from '../utils/api';

const UserProfile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    nickname: user.nickname,
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getUser(user.id).then((data) => {
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        nickname: data.nickname,
      });
    });
  }, [user.id, setUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user.id, formData)
      .then((data) => {
        setUser(data);
        history.push('/game');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="user-profile">
      <h1 className="title">User Profile</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;

// UserProfile-komponenten er en funksjonell komponent som representerer brukerprofilskjermen til Red Blue-spillet.
// UseState-kroken brukes til å definere tilstandsvariablene for skjemadataene (navn, e-post og kallenavn) og feilmelding.
// useEffect-kroken brukes til å hente brukerdata fra API når komponenten monteres og angi skjemadatatilstanden deretter.
// UseHistory-kroken brukes for å få tilgang til historikkobjektet til ruteren.
// HandleChange-funksjonen er en tilbakeringingsfunksjon som oppdaterer skjemadata når brukeren legger inn data i inndatafeltene.
// HandleSubmit-funksjonen er en tilbakeringingsfunksjon som sender en oppdateringsforespørsel til API når brukeren sender inn skjemaet.
// Hvis oppdateringen er vellykket, settes brukeren i tilstanden overordnet komponent (App.js) og omdirigeres til spillskjermen.
//  Hvis oppdateringen mislykkes, vises en feilmelding.
// Returerklæringen inneholder JSX-koden for brukerprofilskjermen, som består av et skjema med tre inndatafelt (navn, e-post og kallenavn),
// en feilmelding (hvis aktuelt) og en send-knapp. Inndatafeltene og send inn
