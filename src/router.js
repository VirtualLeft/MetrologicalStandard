import React from 'react'
import {Route} from 'react-router-dom'
import Login from './containers/Login'
import Home from './components/Home'
import MainWrapper from './components/MainWrapper'
import UserSettings from './containers/UserSettings'
import ThemeSettings from './containers/ThemeSettings'
import VerParamSettings from './containers/VerParamSettings'
import VfcDataSubmit  from './containers/VfcDataSubmit'
import Test from './components/Test'

export const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    routes: [{
      path: '/home/sysset',
      component: MainWrapper,
      name: '系统设置',
      routes: [{
        path: '/home/sysset/usersettings',
        component: UserSettings,
        name: '用户管理',
      }, {
        path: '/home/sysset/themesettings',
        component: ThemeSettings,
        name: '主题设置',
      }],
    }, {
      path: '/home/verset',
      component: MainWrapper,
      name: '核查设置',
      routes: [{
        path: '/home/verset/verparamsettings',
        component: VerParamSettings,
        name: '核查参数设置'
      }, {
        path: '/home/verset/test',
        component: Test,
        name: '测试'
      }]
    }, {
      path: '/home/stdvfc',
      component: MainWrapper,
      name: '标准核查',
      routes: [{
        path: '/home/stdvfc/vfcdatasubmit',
        component: VfcDataSubmit,
        name: '核查数据提交'
      }]
    }],
  },
]


export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact || false} render={props => (
    <route.component {...props} routes={route.routes} name={route.name}/>
  )}/>
)