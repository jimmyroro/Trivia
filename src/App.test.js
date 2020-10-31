import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ReactDOM from 'react-dom';
import App from './App';
import Question from './Question';
import Header from './Header';

configure({ adapter: new Adapter() })

describe('App', () => {
  xtest('renders App component', () => {
    shallow(<App/>)
  })

  xtest('can enter a username', () => {
    render(<App/>)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), 'dummyUser{enter}');
    expect(screen.getByText(/dummyUser/)).toBeInTheDocument();
  })

  xtest('the navbar should display a currentScore and highScore upon login', () => {
    render(<App/>)
    userEvent.type(screen.getByRole('textbox'), 'dummyUser{enter}');
    expect(screen.getByText(/High score: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Current score: 0/)).toBeInTheDocument();
  })

  xtest('after clicking submit, the answer should display', () => {
    render(<Question />)
    userEvent.click(screen.getByTestId("answer0"));
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/The correct answer is: /)).toBeInTheDocument();
  })

  test('clicking next question button should show another question', async () => {
    render(<Question/>)
    const firstQuestion = screen.getByRole('heading').innerHTML;
    await userEvent.click(screen.getByTestId("answer0"));
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('button'));
    const secondQuestion = screen.getByRole('heading').innerHTML;
    await expect(firstQuestion).not.toEqual(secondQuestion);
  })
    // test('questions should not duplicate', () => {

    // })

})

