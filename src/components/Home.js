import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { RouteWithSubRoutes } from '../router'

import { Layout, Menu, Icon } from 'antd';

import '../../public/css/main.css'

const { Header } = Layout;

const Home = (props) => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to={'/home/sysset/usersettings'}>系统设置</Link></Menu.Item>
          <Menu.Item key="2"><Link to={'/home/verify'}>标准核查</Link></Menu.Item>
          <Menu.Item key="3"><Link to={'/home/verset/verifyparametersettings'}>核查设置</Link></Menu.Item>
          <Menu.Item key="4"><Link to={'/home/pcproc'}>控制图过程参数</Link></Menu.Item>
        </Menu>
      </Header>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </Layout>
  )
}
  
export default Home