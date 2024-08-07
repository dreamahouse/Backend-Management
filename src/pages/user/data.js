import { Button, Popconfirm } from "antd";
const UserColumns = () => {
  const editUser = (rowData) => {
    // console.log(rowData);
  };
  const deleteUser = (rowData) => {
    // console.log(rowData.id)
  };
  return [
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
              onConfirm={() => deleteUser(rowData.id)}
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
};
export default UserColumns;
