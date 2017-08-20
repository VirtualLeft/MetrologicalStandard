import React from 'react'
import { RouteWithSubRoutes } from '../../router'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link, Route } from 'react-router-dom'
import UsComponent from './UsComponent'

const {  Content, Sider } = Layout;

const Bread = ({ section, item }) => {
  return (              
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>{section}</Breadcrumb.Item>
      <Breadcrumb.Item>{item}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

const SysSet = (props) => {
  const name = props.name
  return (
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        >
        {props.routes.map((route, i) => (
          <Menu.Item key={i+1}><Link to={route.path}>{route.name}</Link></Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {props.routes.map((route, i) => (
          <Route key={i} path={route.path} render={props => (
            <Bread {...props} section={name} item={route.name}/>
          )}/>
        ))}
        <Content style={{ background: '#fff', padding: 8, margin: 0, minHeight: 720 }}>
          {
            props.routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
        </Content>
      </Layout>
    </Layout>
  )
}

export { UsComponent }
export default SysSet
