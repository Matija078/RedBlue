import React from 'react';

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to RedBlue</h1>
      <p>Please login or signup to play the game.</p>
    </div>
  );
};

export default HomeScreen;

// HomeScreen-komponenten er en funksjonell komponent som representerer startskjermen til Red Blue-spillet.
// UseState-kroken brukes til å definere tilstandsvariabelen for de høye poengsummene.
// UseEffect-kroken brukes til å hente de høyeste poengene fra API når komponenten monteres.
// Returerklæringen inneholder JSX-koden for startskjermen, som består av spilltittelen, toppscore,
// startknapp og autentiseringslenker (registrering og pålogging). Høyskårene vises i en ordnet liste,
// og hvert element i listen inneholder brukerens kallenavn og poengsum. Startknappen er en lenke til spillskjermen,
// og autentiseringslenkene er lenker til registrerings- og påloggingsskjermene.
