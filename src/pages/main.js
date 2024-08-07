import { Layout, theme } from "antd";
import React, { useReducer, useState } from "react";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UserContext from "../contexts/userContext";
import userReducer from "../reducers/userReducer";
import TagHead from "../components/commonTag";
import AuthRouter from "../router/authRouter";
const { Content } = Layout;
const Main = () => {
  const [tagArry, setTagArry] = useState([]);
  const collapsed = useSelector((state) => state.tab.isCollapse);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [users, dispatch] = useReducer(userReducer, []);
  const [activeTag, setActiveTag] = useState({});
  const getTag = (tag) => {
    setActiveTag(tag);
    if (tagArry.indexOf(tag) === -1) {
      setTagArry([...tagArry, tag]);
    }
  };
  return (
    <AuthRouter>
      <UserContext.Provider value={{ users, dispatch }}>
        <Layout className="main-container">
          <CommonAside getTag={getTag} collapsed={collapsed} />
          <Layout>
            <CommonHeader collapsed={collapsed} />
            <TagHead
              style={{ display: "inline-block", width: "40px" }}
              tagArry={tagArry}
              activeTag={activeTag}
            />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </UserContext.Provider>
    </AuthRouter>
  );
};
export default Main;
