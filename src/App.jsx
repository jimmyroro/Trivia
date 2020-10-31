import './App.css';
import React, { useState, useEffect } from 'react';
import Question from './Question';
import Header from './Header';

function App () {
  const [user, setUser] = useState('');
  const [highScore, setHighScore] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentScore, setCurrentScore] = useState(0);

  const checkUser = () => {
    // if user exists, retrieve info from localstorage and set their high score in state as a number
    if (localStorage.getItem(user)) {
      setHighScore(parseInt(localStorage.getItem(user)))
    }
    // if they don't exist, save their username
    else {
      localStorage.setItem(user, 0)
      setHighScore(0)
    }
    setLoggedIn(true);
  }

  // when currentScore changes, check if highScore needs to update
  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem(user, currentScore);
    }
  }, [currentScore])

  return (
    <div>
      {/* once the user logs in, show the header and the question */}
      {loggedIn && 
        <div>
          <Header
            highScore={highScore}
            currentScore={currentScore}
            user={user}
          />
          <Question
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            user={user}
          />
        </div>
      }
      {/* prompt user to log in with a name */}
      {!loggedIn && 
      <div id="notLoggedIn">
        <h5>Please enter a name!</h5>
        <form onSubmit={() => checkUser()} id="usernameForm">
          <div className='form-group' >
            <input
              onChange={(e) => setUser(e.target.value)}
              type='text'
              className='form-control'
              aria-describedby='username'
            ></input>
          </div>
          <button type='button' className='btn btn-primary' onClick={() => checkUser()}>
            Submit
          </button>
        </form>
      </div>
      }
    </div>
  )
}

export default App
