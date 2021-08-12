import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectCurrency from '@components/SelectCurrency';

it('renders welcome message', () => {
  render(<SelectCurrency id="test" value="USD" data={{ USD: 'United States of America' }} />);
  expect(screen.getByText('select')).toBeInTheDocument;
});
