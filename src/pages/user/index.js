import { Button, Form, Input, Table, Popconfirm } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { getUser, createUser, updateUser, delUser } from "../../api";
import "./uer.css";
import Dialog from "../../components/modal";
import dayjs from "dayjs";
// import UserContext from "../../contexts/userContext";
const User = () => {
  const [modalType, setModalType] = useState("");
  const [keyword, setKeyword] = useState({
    name: "",
  });
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({});
  // const { users, dispatch } = useContext(UserContext);
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val ? "女" : "男";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <>
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => editUser(rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户，是否继续？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => deleteUser(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const editUser = (rowData) => {
    setIsModalOpen(true);
    setModalType("EDIT");
    const cloneData = JSON.parse(JSON.stringify(rowData));
    cloneData.birth = dayjs(cloneData.birth);
    form.setFieldsValue(cloneData);
  };
  const deleteUser = (id) => {
    delUser(id).then(() => {
      getData();
    });
  };
  const handleSubmit = (e) => {
    setKeyword({ name: e.keyword });
  };
  const addUser = () => {
    setIsModalOpen(true);
    setModalType("ADD");
  };

  const handleOk = (form) => {
    setIsModalOpen(false);
    form
      .validateFields()
      .then((val) => {
        val.birth = dayjs(val.birth).format("YYYY-MM-DD");
        if (modalType === "ADD") {
          if (modalType === "ADD") {
            createUser(val).then((res) => {
              getData();
              handleCancel();
              form.resetFields();
            });
          }
        } else {
          updateUser(val).then((res) => {
            getData();
            handleCancel();
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const getForm = (form) => {
    setForm(form);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getData = () => {
    getUser(keyword)
      .then((res) => setTableData(res.data.list))
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getData();
  }, [tableData, keyword]);
  return (
    <>
      <div className="user">
        <Button onClick={() => addUser()} type="primary">
          新增
        </Button>
        <Form layout="inline" onFinish={handleSubmit}>
          <FormItem name="keyword">
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </FormItem>
        </Form>
      </div>
      <Table
        style={{ marginTop: "15px" }}
        columns={columns}
        dataSource={tableData}
        rowKey={"id"}
      />
      <Dialog
        type={modalType}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        formInstance={getForm}
      />
    </>
  );
};

export default User;
