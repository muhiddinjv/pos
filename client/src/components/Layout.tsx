import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UserSwitchOutlined,
    MoneyCollectOutlined,
    OrderedListOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { ReactNode, useState, FC } from 'react';
  import { useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
  import './layout.css';

  interface Props {
    children?: ReactNode
    // any props that come into the component
}
  
  const { Header, Sider, Content } = Layout;
  
  const LayoutApp: FC<Props> = ({children}) => {
    const {cartItems} = useSelector((state: any) => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
      setCollapsed(!collapsed);
    }
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h3 className='logo-title' style={{color:'white'}}>MP POS</h3>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key='/' icon={<HomeOutlined/>}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<MoneyCollectOutlined/>}>
              <Link to='/bills'>Bills</Link>
            </Menu.Item>
            <Menu.Item key='/products' icon={<OrderedListOutlined/>}>
              <Link to='/products'>Products</Link>
            </Menu.Item>
            <Menu.Item key='/customers' icon={<UserSwitchOutlined/>}>
              <Link to='/customers'>Customers</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined/>}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="cart-items">
              <ShoppingCartOutlined />
              <div className="cart-badge">{cartItems.length}</div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default LayoutApp;