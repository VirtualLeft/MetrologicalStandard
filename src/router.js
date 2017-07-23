import React from 'react'
import { Route } from 'react-router-dom'
import Login from './containers/Login'
import Home from './components/Home'
import SysSet from './components/SysSet'
import UserSettings from './containers/UserSettings'
import ThemeSettings from './containers/ThemeSettings'

export const routes = [
  { path: '/',
    component: Login,
    exact: true,
  },
  { path: '/home',
    component: Home,
    routes: [{ 
      path: '/home/sysset',
      component: SysSet,
      name: '系统设置',
      routes: [{ 
        path: '/home/sysset/usersettings',
        component: UserSettings,
        name: '用户管理',
      },{
        path: '/home/sysset/themesettings',
        component: ThemeSettings,
        name: '主题设置',
      }],
    }],
  },
]


export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact || false} render={props => (
    <route.component {...props} routes={route.routes} name={route.name}/>
  )}/>
)