import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixture/expenses';

// W przypadku testów dla dynamicznych komponentów, których dzialanie zależy od stanu,
// testujemy nie połączone ze Reduxem wersje komponentów by dodać tam mockup danych

describe('Should render ExpenseList component...', () => {
  test('...with expenses provided', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('...without expenses provided', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
});

