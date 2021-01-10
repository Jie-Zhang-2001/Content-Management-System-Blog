import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../static/css/adminIndex.css";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import AddArticle from './AddArticle';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import auth from '../auth';
import AllBlog from './AllBlog'

const {  Content, Footer, Sider } = Layout;

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    setSelected(localStorage.getItem('selected'));
  }, [])
  

  const onClick = (e) => {
    setSelected(e.target.innerHTML);
    localStorage.setItem('selected', e.target.innerHTML);
    switch (e.target.innerHTML) {
      case 'Working Stage':
        localStorage.setItem('selectedIndex', 1);
        break;
      case 'All Blog': {
        localStorage.setItem('selectedIndex', 2);
        break;
      }
      default:
        localStorage.setItem('selectedIndex', 1);
   }
  }
  const defaultKeySelection = () => {
    if (localStorage.getItem('selectedIndex') === null) {
      return '1';
    } else {
      return localStorage.getItem('selectedIndex');
    }
  }

  return (
    <Router>
    <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[defaultKeySelection()]} mode="inline">
          <Menu.Item key="1"  icon={<PieChartOutlined />}>
              <Link to='/admin' onClick={onClick}>Working Stage</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='/admin/all'onClick={onClick} >All Blog</Link>
          </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />}>
              <a href='/' onClick={() => { auth.logout() }}>Log Out </a>
            </Menu.Item>
        </Menu>
        </Sider>
        
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Management System</Breadcrumb.Item>
              <Breadcrumb.Item>{localStorage.getItem('selectedIndex') === null? 'Working Stage' : selected}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Route path='/admin' exact component={AddArticle} />
            <Route path='/admin/all' component={AllBlog} />
              
            
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          jz-blog.com
        </Footer>
      </Layout>
    </Layout></Router>
  );
};

export default AdminIndex;
