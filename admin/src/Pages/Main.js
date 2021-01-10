import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
import ProtectedRoute from '../ProtectedRoute'

export default function Main(props) {
    return (
        <Router>
            <Route path='/' exact component={Login} />
            <ProtectedRoute path='/admin'  component = { AdminIndex }/>
        </Router>
    )
}
