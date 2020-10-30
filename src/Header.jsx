import React from 'react';

const Header = ( {highScore, currentScore, user} ) => {
  return (
    <nav class="navbar navbar-light fixed-top" id="navbar">
      <h3 class="navbar-brand">Navbar</h3>
      <h3 class="navbarElement">current high score: {highScore}</h3>
      <h3 class="navbarElement">current score: {currentScore}</h3>
      <h3 class="navbarElement">Logged in as {user}</h3>
    </nav>
  )
}

export default Header;
