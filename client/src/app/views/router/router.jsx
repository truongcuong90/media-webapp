import React, { Component } from 'react'
import {
  Router as BrowserRouter,
  Route,
  Switch as StaticSwitch
} from 'react-router'

import { AnimatedSwitch } from 'react-router-transition'

const mapStyles = styles => ({
  opacity: styles.opacity,
  ...(
    styles.left !== undefined ? {
      transform: `translateX(${ styles.left }%)`
    } : {}
  )
})

const effects = {
  slide: {
    atEnter: { opacity: 0, left: -100 },
    atLeave: { opacity: 0, left: 100 },
    atActive: { opacity: 1, left: 0 }
  },
  fade: {
    atEnter: { opacity: 0 },
    atLeave: { opacity: 0 },
    atActive: { opacity: 1 }
  }
}

const renderRoutes = routes => routes.map(
  route => <Route {...route} key={route.path} />
)

const Switch = ({ animated, children }) => {
  if (!animated) {
    return <StaticSwitch>{ children }</StaticSwitch>
  }

  return (
    <AnimatedSwitch
      className="switch-wrapper"
      { ...effects[animated] }
      mapStyles={ mapStyles }>
      { children }
    </AnimatedSwitch>
  )
}

const Router = ({
  animated = false,
  history,
  routes,
  otherwise: Otherwise
}) => {
  return (
    <BrowserRouter history={ history }>
      <Switch animated={ animated }>
        { renderRoutes(routes) }
        { Otherwise && <Otherwise /> || null }
      </Switch>
    </BrowserRouter>
  )
}

export default Router