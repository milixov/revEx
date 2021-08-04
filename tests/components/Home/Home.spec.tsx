import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from '@pages/Home/Home';

describe('Home component', () => {
  test('should render component properly', () => {
    // given
    const dummyComponentProps = {
      bar: 'test',
      foo: 'lorem',
    };

    // when
    const componentRenderer = renderer.create(<Home {...dummyComponentProps} />);
    const tree = componentRenderer.toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
