import React from 'react'

import { Home, Login, Register, Blog, Verify, Profile } from './pages'

const routes = [
  {
    path: '/',
    component: (
        <Home />
    )
  },
  {
    path: '/login',
    component: (
        <Login />
    )
  },
  {
    path: '/register',
    component: (
        <Register />
    )
  },
  {
    path: '/:blogId/blog',
    component: (
      <Blog />
    )
  },
  {
    path: '/verify',
    component: (
      <Verify />
    )
  },
  {
    path: '/profile',
    component: (
      <Profile />
    )
  }
]

export default routes