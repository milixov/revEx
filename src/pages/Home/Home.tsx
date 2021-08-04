import * as React from 'react';

import style from './Home.scss';

interface IHomeProps {
  foo: string;
  bar: string;
}

export const Home = (props: IHomeProps): JSX.Element => (
  <div className={style.sample}>
    Hello from {props.foo} and {props.bar}!
  </div>
);
