import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import { getUser } from './utils/api';

const GameScreenLazy = React.lazy(() => import('./screens/GameScreen'));
const HomeScreenLazy = React.lazy(() => import('./screens/HomeScreen'));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(localStorage.getItem('userId'));
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem('userId')) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact component={HomeScreenLazy} />
          <Route path="/game" exact component={GameScreenLazy} />
        </React.Suspense>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={UserProfile} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// App-komponenten er toppnivåkomponenten i React-applikasjonen.
// Brukertilstandsvariabelen representerer den for øyeblikket påloggede brukeren, og er i utgangspunktet satt til null.
// useEffect-kroken brukes til å hente brukerdata fra API-serveren når komponenten monteres, hvis bruker-IDen er lagret i nettleserens localStorage.
// Ruter-komponenten fra react-router-dom-biblioteket brukes til å definere programmets ruter.
// Header-komponenten gjengis øverst på siden og viser nettstedets logo, navigasjonslenker og brukerinformasjon hvis brukeren er pålogget.
// Rutekomponentene brukes til å definere stiene og komponentene for hver rute i applikasjonen.
// Bunntekst-komponenten gjengis nederst på siden og viser nettstedets opphavsrettsinformasjon.
// Den nøyaktige rekvisitten brukes for å sikre at rutene er nøyaktig matchet.
// Komponentene HomeScreen, GameScreen, Login, Signup og UserProfile importeres og brukes som komponenter for de respektive rutene.
