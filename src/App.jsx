import './App.css'
import React, { useState, useEffect, FC } from 'react'
import ls from 'local-storage'

function App () {
  const [storage, setStorage] = useState([])
  const [user, setUser] = useState('')

  const checkUser = () => {
    console.log(user)
  }

  return (
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
        <button type='button' class='btn btn-primary' onClick={(e) => checkUser(e)}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
