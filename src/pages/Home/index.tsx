import React, { useState } from 'react';

import { initialComponentProps } from '@pages/Home/handlers';
import { Home } from '@pages/Home/Home';

export default (): JSX.Element => {
  const [componentProps] = useState(initialComponentProps);

  return <Home {...componentProps} />;
};
