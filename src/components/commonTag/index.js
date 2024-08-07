import React, { useEffect, useState } from "react";
import { Tag, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import MenuConfig from "../../config";
const TagHead = ({ tagArry, activeTag }) => {
  const [tagList, setTagList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let result = [];
    tagArry.forEach((m) => {
      const item = MenuConfig.find((tag) =>
        tag.children
          ? tag.children.find((child) => child.path === m.key)
          : tag.path === m.key
      );
      if (item) {
        if (item.children) {
          const child = item.children.find((i) => i.path === m.key);
          if (result.every((r) => r.path !== child.path)) {
            result.push({ label: child.label, path: child.path });
          }
        } else {
          if (result.every((r) => r.path !== item.path))
            result.push({ label: item.label, path: item.path });
        }
      }
    });
    setTagList(result);
  }, [tagArry]);

  return (
    <Flex style={{ marginTop: "10px", marginLeft: "15px" }}>
      {tagList &&
        tagList.map((tag) => (
          <Tag
            style={{ cursor: "pointer" }}
            color={tag.path === activeTag.key ? "#2db7f5" : ""}
            key={tag.path}
            onClick={() => navigate(tag.path)}
          >
            {tag.label}
          </Tag>
        ))}
    </Flex>
  );
};

export default TagHead;
