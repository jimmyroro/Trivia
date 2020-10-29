import React, { useState, useEffect } from 'react';
import triviaQuestions from './triviaQuestions.json';

function Question () {
  const [roundQuestions, setRoundQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // a function to create a random integer
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
        console.log(triviaQuestions[random].question)
      }
    }
    setRoundQuestions(temp);
  }, [])

  // once the roundQuestions are populated, update the currentQuestion
  useEffect(() => {
    if (currentQuestion === null) {
      setCurrentQuestion(0);
    }
    else setCurrentQuestion(currentQuestion + 1)
  }, roundQuestions)

  return (
    <div>
    {(currentQuestion !== null) &&
      <h4>{roundQuestions[currentQuestion].question}</h4>
    }
    </div>
  )
}

export default Question;
