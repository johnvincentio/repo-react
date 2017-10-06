import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Post from './Post'

test('Post component should render the title not as a link', () => {
  const component = shallow(<Post title='My post' />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

test('Post component should render the title as a link when the titleLink prop is true', () => {
  const component = shallow(<Post titleLink />)
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
