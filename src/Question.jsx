import React, { useState, useEffect } from 'react';
import triviaQuestions from './triviaQuestions.json';

function Question ({currentScore, setCurrentScore}) {
  const [roundQuestions, setRoundQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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

  // checks if the selected answer is the correct answer, updating current score if necessary and making submitted = true
  function checkAnswer() {
    if (roundQuestions[currentQuestion].correct === selectedAnswer) {
      setCurrentScore(currentScore + 1)
    }
    setSubmitted(true);
  }

  function generateRoundQuestions() {
    // generate random numbers and use them to select triviaQuestions
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
    // check to see if we are restarting a round; if so, reset score and question counter
    if (currentQuestion === 10) {
      setCurrentQuestion(0);
      setCurrentScore(0);
    }
    setRoundQuestions(tempArray);
  }

  function nextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  // when Question first renders, generate the roundQuestions
  useEffect(() => {
    generateRoundQuestions(); // eslint-disable-next-line
  }, [])

  // once the roundQuestions are populated, update the currentQuestion
  useEffect(() => {
    if (currentQuestion === null) {
      setCurrentQuestion(0);
    }
    else setCurrentQuestion(currentQuestion + 1) // eslint-disable-next-line
  }, [roundQuestions])



  return (
    <div id="questionArea">
      {/* render when the last (10th) question has been answered */}
      {currentQuestion === 10 &&
      <div className="oldParchment">
        <h3>Congratulations! You got {currentScore} questions right!</h3>
        <button type='button' className='btn btn-primary' onClick={() => generateRoundQuestions()}>
          Play again?
        </button>
      </div>
      }
      {/* renders once the roundQuestions have been generated and the currentQuestion set */}
      {((currentQuestion < 10) && (currentQuestion != null) ) &&
        <div>
          {submitted === false &&
            <div className="oldParchment">
              <h3>{roundQuestions[currentQuestion].question}</h3>
                {roundQuestions[currentQuestion].options.map((option, index) => 
                  <div className="form-check answer" key={"answer" + index}>
                    <input className="form-check-input" type="radio" data-testid={"answer" + index} name="answers" id={"answer" + index} value={option} onClick={(e) => setSelectedAnswer(e.target.value)}/>
                    <label className="form-check-label answer" for={"answer" + index} >
                      {option}
                    </label>
                  </div>
                )}
              <button type='button' className='btn btn-primary' onClick={() => checkAnswer()}>
                Check Answer
              </button>
            </div>
          }
          {/* shown after the user submits their answer */}
          {submitted && 
            <div className="oldParchment">
              {/* user got it correct */}
              {roundQuestions[currentQuestion].correct === selectedAnswer &&
                <h3>Correct! {roundQuestions[currentQuestion].correct}</h3>
              }
              {/* user got it incorrect */}
              {roundQuestions[currentQuestion].correct !== selectedAnswer &&
                <h3>Sorry, the correct answer is: {roundQuestions[currentQuestion].correct}</h3>
              }
              <button type='button' className='btn btn-primary' onClick={() => nextQuestion()}>
              Next Question
              </button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Question;
