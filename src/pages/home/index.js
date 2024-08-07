import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import MyEcharts from "../../components/Echarts";
import * as Icon from "@ant-design/icons";
import { getData } from "../../api";
import userPng from "../../assets/images/user.png";
import "./home.css";
const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];
const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [echartsData, setEchartsData] = useState({});
  useEffect(() => {
    getData().then((res) => {
      const { data } = res.data;
      setTableData(data.tableData);
      const orderData = data.orderData;
      const userData = data.userData;
      const videoData = data.videoData;
      const series = orderData.data;
      const xData = orderData.date;
      const keyArray = Object.keys(series[0]);
      const yData = [];
      keyArray.forEach((key) => {
        yData.push({
          name: key,
          data: series.map((s) => s[key]),
          type: "line",
        });
      });
      setEchartsData({
        orderData: {
          xData,
          yData,
        },
        userData: {
          xData: userData.map((u) => u.date),
          yData: [
            {
              name: "新增用户",
              data: userData.map((u) => u.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: userData.map((u) => u.active),
              type: "bar",
            },
          ],
        },
        videoData: {
          series: [
            {
              data: videoData,
              type: "pie",
            },
          ],
        },
      });
    });
  }, []);
  const IconElement = (name) => React.createElement(Icon[name]);
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userPng} alt="userPng" />
            <div className="user-info">
              <p className="name">Admin</p>
              <p className="access">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              上次登录时间：<span>2024-7-18</span>
            </p>
            <p>
              上次登录地点：<span>西安</span>
            </p>
          </div>
        </Card>
        <Card className="table">
          <Table
            rowKey={"name"}
            dataSource={tableData}
            columns={columns}
            pagination={false}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => (
            <Card key={index}>
              <div className="icon-box" style={{ background: item.color }}>
                {IconElement(item.icon)}
              </div>
              <div className="detail">
                <p className="num">¥{item.value}</p>
                <p className="txt">{item.name}</p>
              </div>
            </Card>
          ))}
        </div>
        {echartsData.orderData && (
          <MyEcharts
            style={{ height: "350px" }}
            chartData={echartsData.orderData}
          />
        )}
        <Row>
          <Col span={12}>
            {echartsData.userData && (
              <MyEcharts
                style={{ height: "320px" }}
                chartData={echartsData.userData}
              />
            )}
          </Col>
          <Col span={12}>
            {echartsData.videoData && (
              <MyEcharts
                style={{ height: "340px" }}
                chartData={echartsData.videoData}
                isAxisChart={false}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
