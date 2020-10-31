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
  test('renders App component', () => {
    shallow(<App/>)
  })


    // test('questions should not duplicate', () => {

    // })

    // test('after clicking submit, the answer should display', () => {
// 
    // })
})

