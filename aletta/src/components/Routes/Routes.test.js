import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import Routes from './Routes'
import Home from '../Home/Home'
import About from '../About/About'
import PostDetail from '../PostDetail/PostDetail'
import NotFound from '../NotFound/NotFound'

test('should render the Home component when visiting /', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(Home).length).toBe(1)
})


test('should render the About component when visiting /about', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/about' ]} initialIndex={0}>
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(About).length).toBe(1)
})

test('should render the PostDetail component when visiting /post/:slug', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/post/getting-started-with-css-modules-in-webpack' ]} initialIndex={0}>
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(PostDetail).length).toBe(1)
})

test('should render the NotFound component when visiting /404-not-found', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/404-not-found' ]} initialIndex={0}>
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(NotFound).length).toBe(1)
})
