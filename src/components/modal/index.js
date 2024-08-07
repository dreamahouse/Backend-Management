import { Form, Input, Modal, InputNumber, Select, DatePicker } from "antd";
import { useEffect } from "react";
const { Option } = Select;
const Dialog = ({
  type,
  isModalOpen,
  handleOk,
  handleCancel,
  formInstance,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    formInstance(form);
  }, []);
  return (
    <Modal
      title={type === "add" ? "新增用户" : "编辑用户"}
      open={isModalOpen}
      onOk={() => handleOk(form)}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "请输入姓名！" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          name={"age"}
          label="年龄"
          rules={[
            { required: true, message: "请输入年龄" },
            {
              type: "number",
              min: 0,
              max: 120,
              message: "年龄必须是数字且大于0小于120 ",
            },
          ]}
        >
          <InputNumber style={{ width: "275px" }} />
        </Form.Item>
        {type === "EDIT" && (
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="sex"
          label="性别"
          rules={[{ required: true, message: "请选择性别!" }]}
        >
          <Select placeholder="请选择性别">
            <Option value={0}>男</Option>
            <Option value={1}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item label="出生日期" name="birth">
          <DatePicker style={{ width: "275px" }} placeholder="请选择出生日期" />
        </Form.Item>
        <Form.Item label="地址" name="addr">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Dialog;
