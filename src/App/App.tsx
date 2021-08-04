import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import style from './App.scss';
import { routes } from '@routes/index';

export const App = (): JSX.Element => (
  <div className={style.componentWrapper}>
    <Router>
      <div>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </div>
    </Router>
  </div>
);
