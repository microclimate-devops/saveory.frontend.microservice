import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import UserAccess from './components/UserAccess';

//The main component
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//One of the two possible variations in rendering the App
it('Home renders without crashing', () => {
  const div = document.createElement('div');
  const user = "test";
  const token = 1;
  ReactDOM.render(<Home userToken={token} user={user}/>, div);
});

//The second of the two possible variations in rendering the App
it('UserAccess renders without crashing', () => {
  const div = document.createElement('div');
  const loginHandler = function(o){};
  ReactDOM.render(<UserAccess loginHandler={token}/>, div);
});
