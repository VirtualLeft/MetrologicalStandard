import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router-dom'
import {RouteWithSubRoutes} from '../router'

import {Layout, Menu, Icon} from 'antd';

import '../../public/css/main.css'

const {Header} = Layout;

const Home = (props) => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{lineHeight: '64px'}}
        >
          {
            props.routes.map((route, i) => (
              <Menu.Item key={i + 1}><Link to={route.routes[0].path}>{route.name}</Link></Menu.Item>
            ))
          }
        </Menu>
      </Header>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </Layout>
  )
}

export default Home