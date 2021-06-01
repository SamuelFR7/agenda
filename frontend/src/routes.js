import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Add from './pages/Add'
import Edit from './pages/Edit'

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/add" component={Add} />
            <Route path="/edit" component={Edit} />
        </BrowserRouter>
    )
}