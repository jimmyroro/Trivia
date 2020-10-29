import React, { useState, useEffect } from 'react';
import triviaQuestions from './triviaQuestions.json';

function Question ({ highScore, setHighScore, currentScore, setCurrentScore}) {
  const [roundQuestions, setRoundQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // a function to create a random integer
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  // a function to shuffle an array in place
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // a function to combine correct and incorrect answers into one array, then randomize their order
  function randomize(questionObj) {
    questionObj.options = [];
    questionObj.incorrect.map((answer) => questionObj.options.push(answer))
    questionObj.options.push(questionObj.correct);
    shuffle(questionObj.options);    
  }

  function checkAnswer() {
    if (roundQuestions[currentQuestion].correct === selectedAnswer) {
      setCurrentScore(currentScore + 1)
    }
    
    setHighScore(highScore + 1);
  }

  useEffect(() => {
    // when Question first renders, generate random numbers and use them to select triviaQuestions
    // push those questions into a temporary array, making sure there are no duplicates, randomizing their answers,
    // then save the array in state
    let tempArray = [];
    while (tempArray.length <= 9) {
      let random = getRandomInt(0, triviaQuestions.length)
      if (!tempArray.includes(triviaQuestions[random])) {
        randomize(triviaQuestions[random]);
        tempArray.push(triviaQuestions[random]);
      }
    }
    setRoundQuestions(tempArray);
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
      <div>
        <h4>{roundQuestions[currentQuestion].question}</h4>
        {roundQuestions[currentQuestion].options.map((option, index) => 
          <div class="form-check">
              <div >
                <input class="form-check-input" type="radio" name="answers" id={"answer" + index} value={option} onClick={(e) => setSelectedAnswer(e.target.value)}/>
                <label class="form-check-label" for={"answer" + index} >
                  {option}
                </label>
              </div>
          </div>
        )}
          <button type='button' class='btn btn-primary' onClick={() => checkAnswer()}>
          Submit
          </button>
      </div>
    }
    </div>
  )
}

export default Question;
