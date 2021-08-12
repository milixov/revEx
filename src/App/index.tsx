import React from 'react';

//router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routes } from '@routes/index';

//react-query
import { QueryClient, QueryClientProvider } from 'react-query';

//style
import style from './style.scss';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <div className={style.componentWrapper}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </div>
      </Router>
    </QueryClientProvider>
  </div>
);

export default App;
