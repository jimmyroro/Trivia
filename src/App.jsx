import './App.css';
import React, { useState, useEffect, FC } from 'react';
import Question from './Question';

function App () {
  const [storage, setStorage] = useState([]);
  const [user, setUser] = useState('');
  const [highScore, setHighScore] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentScore, setCurrentScore] = useState(0);

  const checkUser = () => {
    // if user exists, retrieve info from localstorage and set their high score in state as a number
    if (localStorage.getItem(user)) {
      // TODO: Remove console logs
      console.log('user exists');
      setHighScore(parseInt(localStorage.getItem(user)))
    }
    // if they don't exist, save their username
    else {
      // TODO: Remove console logs
      console.log('no exist')
      localStorage.setItem(user, 0)
      setHighScore(0)
    }
    setLoggedIn(true);
  }

  return (
    <div>
      {loggedIn && 
        <div>
          <h3>current high score: {highScore}</h3>
          <h3>current score: {currentScore}</h3>
          <h3>Logged in as {user}</h3>
          <Question
            highScore={highScore}
            setHighScore={setHighScore}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
          />
        </div>
      }
      {!loggedIn && 
      <div>
        <h5>Please enter a name!</h5>
        <form>
          <div class='form-group'>
            <input
              onChange={(e) => setUser(e.target.value)}
              type='text'
              class='form-control'
              aria-describedby='username'
            ></input>
          </div>
          <button type='button' class='btn btn-primary' onClick={() => checkUser()}>
            Submit
          </button>
        </form>
      </div>
      }
    </div>
  )
}

export default App
