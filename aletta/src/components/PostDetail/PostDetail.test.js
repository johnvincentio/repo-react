import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PostDetail from './PostDetail'

test('PostDetail component should render correctly', () => {
  const component = shallow(<PostDetail />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
