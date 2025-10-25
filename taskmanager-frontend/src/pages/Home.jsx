import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Badge, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import heroImage from "../assets/Heisenberg.jpg"; // Replace with your image
import { getTasks } from "../api/taskapi";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks for dashboard stats
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: `url(${heroImage}) center/cover no-repeat`,
          height: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          position: "relative",
          borderRadius: "12px",
          margin: "1rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
          }}
        ></div>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", zIndex: 1 }}>
          Task Manager
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "20px", zIndex: 1 }}>
          Organize your tasks efficiently
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/create")}
          style={{ zIndex: 1 }}
        >
          Create New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ padding: "2rem" }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <h3>Total Tasks</h3>
            <h2>
              <Badge count={totalTasks} style={{ backgroundColor: "#1890ff" }} />
            </h2>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <h3>Completed Tasks</h3>
            <h2>
              <Badge count={completedTasks} style={{ backgroundColor: "#52c41a" }} />
            </h2>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <h3>Pending Tasks</h3>
            <h2>
              <Badge count={pendingTasks} style={{ backgroundColor: "#faad14" }} />
            </h2>
          </Card>
        </Col>
      </Row>

      {/* Task List Section */}
      <div style={{ padding: "2rem", marginBottom: "2rem" }}>
        <Card
          title="Your Tasks"
          style={{
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {loading ? <Spin size="large" style={{ display: "block", margin: "2rem auto" }} /> : <TaskList />}
        </Card>
      </div>

      {/* Footer / Call-to-action */}
      <div style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
        <p>Stay productive and organized with Task Manager 🚀</p>
      </div>
    </div>
  );
};

export default Home;
