import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Show from './pages/Show'
import Login from './pages/Login'
import Register from './pages/Register'

export default function Routes () {
  return (
         <BrowserRouter>
            <Route path="/main" component={Main} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/show/:id" component={Show}/>
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Login} />
        </BrowserRouter>
  )
}
