import React from 'react';
import {render} from '@testing-library/react';
import AdsListComponent from './adslist.component';

test('expect to load table', () => {
  const {container} = render(<AdsListComponent />);
  const table = container.getElementsByClassName('MuiTable-root');
  expect(table.length).toBe(1);
});
