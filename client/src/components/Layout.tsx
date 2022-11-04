import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UserSwitchOutlined,
    UserOutlined,
    MoneyCollectOutlined,
    OrderedListOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { ReactNode, useState, FC, useEffect } from 'react';
  import {  useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
  import './layout.css';
  import Spinner from './Spinner';
  import jwt_decode from 'jwt-decode'

interface Props {
    children?: ReactNode
}
  
  const { Header, Sider, Content } = Layout;
  
const LayoutApp: FC<Props> = ({children}) => {
    const {cartItems, loading} = useSelector((state: any) => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
      setCollapsed(!collapsed);
    }

    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const usertoken: any = localStorage.getItem('usertoken');
    const isAdmin: any = JSON.stringify(jwt_decode(usertoken));
      
    return (
      <Layout className="main-layout">
        {loading && <Spinner />}
        <Sider className="site-layout-background" width={200} breakpoint="lg" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className='logo-title'>POS</h2>
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
            {isAdmin?.includes('true') && <Menu.Item key='/admin' icon={<UserOutlined/>}>
              <Link to='/admin'>Admin</Link>
            </Menu.Item>}
            <Menu.Item key='/logout' icon={<LogoutOutlined/>} onClick={()=>{
              localStorage.removeItem('usertoken'); navigate('/login')
            }}>
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
            <div className="cart-items" onClick={()=>navigate('/cart')}>
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