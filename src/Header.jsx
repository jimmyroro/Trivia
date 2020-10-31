import React from 'react';

const Header = ( {highScore, currentScore, user} ) => {
  return (
    <nav className="navbar navbar-light" id="navbar">
      <h3 className="navbarElement">High score: {highScore}</h3>
      <h3 className="navbarElement">Current score: {currentScore}</h3>
      <h3 className="navbarElement">Logged in as: {user}</h3>
    </nav>
  )
}

export default Header;
