import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('without component', () => {  
  const CardComponent = shallow(<Card />);
  expect(CardComponent).toMatchSnapshot();
});