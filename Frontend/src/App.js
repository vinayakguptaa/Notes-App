import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import { Layout } from 'antd';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Sidebar/>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

