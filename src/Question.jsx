import React, { useState, useEffect, FC } from 'react';
import triviaQuestions from './triviaQuestions.json';

function Question () {
  const [roundQuestions, setRoundQuestions] = useState([]);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  useEffect(() => {
    // when Question first renders, generate random numbers and use them to select triviaQuestions
    // push those questions into a temporary array, making sure there are no duplicates, then save the array in state
    let temp = [];
    while (temp.length <= 9) {
      let random = getRandomInt(0, triviaQuestions.length)
      if (!temp.includes(triviaQuestions[random])) {
        temp.push(triviaQuestions[random]);
      }
    }
    setRoundQuestions(temp);
  }, [])

  return (
    <div>
      hi
    </div>
  )
}

export default Question;
