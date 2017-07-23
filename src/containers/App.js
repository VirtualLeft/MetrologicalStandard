import React, { Component } from 'react' 
import { routes, RouteWithSubRoutes } from '../router'
import { HashRouter as Router, Link, Redirect } from 'react-router-dom'
import DevTools from './DevTools'
const App = () => (
  <div>
  <Router>
    <div>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
  <DevTools/>
  </div>
)

export default App