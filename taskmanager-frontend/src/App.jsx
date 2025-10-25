import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Home from "./pages/Home";
import TaskForm from "./components/TaskForm";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" style={{ color: "white", padding: "16px", textAlign: "center", fontSize: 18 }}>
            Task Manager
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/create">Create Task</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main layout */}
        <Layout>
          <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: 24 }}>
            Task Management Dashboard
          </Header>

          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<TaskForm />} />
                <Route path="/edit/:id" element={<TaskForm />} />
              </Routes>
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Task Manager ©2025 Created with ❤️ using React & Ant Design
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
