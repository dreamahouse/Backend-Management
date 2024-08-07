//添加传参{name,age,sex,birth,addr}
//编辑传参{id,name,age,sex,birth,addr}
//参数统一由user传，始终维护users的数据
const userReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("添加");
    return state;
  } else if (action.type === "EDIT") {
    console.log("编辑");
    return state;
  } else if (action.type === "DELETE") {
    console.log("删除");
    return state;
  }
};
export default userReducer;
