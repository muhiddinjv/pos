import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
import { Link } from 'react-router-dom';
  import './layout.css';
  
  const { Header, Sider, Content } = Layout;
  
  const LayoutApp: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className='logo-title' style={{color:'white'}}>MP POS</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key={1} icon={<UserOutlined/>}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<UserOutlined/>}>
              <Link to='/'>About</Link>
            </Menu.Item>
            <Menu.Item key={3} icon={<UserOutlined/>}>
              <Link to='/'>Help</Link>
            </Menu.Item>
            <Menu.Item key={4} icon={<UserOutlined/>}>
              <Link to='/'>Contact</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default LayoutApp;