import './App.css';
import React, { useState, useEffect, FC } from 'react';
import Question from './Question';

function App () {
  const [storage, setStorage] = useState([]);
  const [user, setUser] = useState('');
  const [highScore, setHighScore] = useState('Zero');
  const [loggedIn, setLoggedIn] = useState(false)

  const checkUser = () => {
    // if user exists, set their high score in state
    if (localStorage.getItem(user)) {
      // TODO: Remove console logs
      console.log('user exists');
      setHighScore(localStorage.getItem(user))
      
    }
    // if they don't exist, save their username
    else {
      // TODO: Remove console logs
      console.log('no exist')
      localStorage.setItem(user, 'Zero')
    }
    setLoggedIn(true);
  }

  return (
    <div>
      <h5>Please enter a name!</h5>
      {loggedIn && 
        <div>
          <h3>current high score: {highScore}</h3>
          <h3>Logged in as {user}</h3>
          <Question/>
        </div>
      }
      {!loggedIn && 
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
      }
    </div>
  )
}

export default App
