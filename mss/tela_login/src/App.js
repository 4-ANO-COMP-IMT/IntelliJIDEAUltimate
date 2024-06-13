

import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import ButtonsPage from './ButtonsPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? <ButtonsPage /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
