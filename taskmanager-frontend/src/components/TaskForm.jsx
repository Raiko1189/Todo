import React, { useEffect } from "react";
import { Form, Input, Checkbox, Button, Card, message, Divider } from "antd";
import { createTask, getTask, updateTask } from "../api/taskapi";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";

const TaskForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTask(id).then(data => {
        form.setFieldsValue({
          title: data.title,
          description: data.description,
          is_completed: data.is_completed,
        });
      });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      if (id) {
        await updateTask(id, values);
        message.success("Task updated successfully!");
      } else {
        await createTask(values);
        message.success("Task created successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Failed to save task. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      }}
    >
      <Card
        hoverable
        style={{
          maxWidth: 600,
          width: "100%",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          borderRadius: "16px",
          padding: "40px 30px",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
        }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {id ? (
              <EditOutlined style={{ color: "#1890ff", fontSize: "28px" }} />
            ) : (
              <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "28px" }} />
            )}
            <span style={{ fontSize: "24px", fontWeight: "600" }}>
              {id ? "Edit Task" : "Create Task"}
            </span>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ is_completed: false }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input
              placeholder="Enter task title"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Enter task description"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item name="is_completed" valuePropName="checked">
            <Checkbox style={{ fontSize: "16px" }}>Completed</Checkbox>
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                borderRadius: "12px",
                background: "linear-gradient(to right, #1890ff, #40a9ff)",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {id ? "Update Task" : "Create Task"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TaskForm;
