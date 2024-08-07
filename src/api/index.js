import APIClient from "./api-client";
export const getData = () => {
  return APIClient.request({
    url: "/home/getData",
  });
};
export const getUser = (params) => {
  return APIClient.request({
    url: "/user/getUser",
    params,
  });
};
export const createUser = (data) => {
  return APIClient.request({
    url: "/user/addUser",
    method: "post",
    data,
  });
};
export const updateUser = (data) => {
  return APIClient.request({
    url: "/user/editUser",
    method: "post",
    data,
  });
};
export const delUser = (data) => {
  return APIClient.request({
    url: "/user/deleteUser",
    method: "post",
    data,
  });
};
export const getToken = (data) => {
  return APIClient.request({
    url: "/login",
    method: "post",
    data,
  });
};
