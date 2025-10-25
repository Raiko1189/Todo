import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/taskapi";
import { useNavigate } from "react-router-dom";
import { Table, Button, Tag, Popconfirm, message, Row, Col, Card } from "antd";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      message.success("Task deleted successfully");
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { 
      title: "Completed", 
      dataIndex: "is_completed", 
      key: "is_completed",
      render: completed => completed ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm 
            title="Are you sure delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Task Dashboard</h2>

      {/* Dashboard Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card title="Total Tasks" bordered={false} style={{ textAlign: 'center' }}>
            <h2>{totalTasks}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Completed Tasks" bordered={false} style={{ textAlign: 'center' }}>
            <h2>{completedTasks}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending Tasks" bordered={false} style={{ textAlign: 'center' }}>
            <h2>{pendingTasks}</h2>
          </Card>
        </Col>
      </Row>

      {/* Task Table */}
      <Table dataSource={tasks} columns={columns} rowKey="id" />
    </div>
  );
};

export default TaskList;
