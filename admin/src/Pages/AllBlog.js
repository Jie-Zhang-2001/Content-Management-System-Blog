import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Button, Popconfirm, Row, Col } from "antd";
import "../static/css/allblog.css";
import date from 'date-and-time';
import { RollbackOutlined } from "@ant-design/icons"
import { MONGO_DATABASE } from '../url';
const pattern = date.compile('MMM D YYYY');


export default function AllBlog(props) {
  const [blogList, setBlogList] = useState([]);
  const [change, setChange] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const deletePost = async (id) => {
    await axios.delete(MONGO_DATABASE + "/admin/delete/" + id);
  };

    useEffect(() => {
      const fetchList = async () => {
        const list = await axios.get(MONGO_DATABASE + "/admin/all");
        setBlogList(list.data.reverse());
      };
      fetchList();
    }, [change]);

  const confirm = (id) => {
    deletePost(id);
    setChange(change + 1);
  };

  const postOrSave = async (id) => {
    await axios.patch(MONGO_DATABASE + "/admin/all", { id: id });
    setChange(change + 1);
  };

  const editPost = async (id) => {
    localStorage.setItem('selected', 'Working Stage')
    localStorage.setItem('selectedIndex', '1')
    props.history.push("/admin", { id });
  };

  const filterCate = (cate) => {
    const list = blogList.filter((item) => item.category === cate);
    setFilterList(list);
    setFiltered(true);
  }

  return (
    <>
      <Button onClick= {() => setFiltered(false)}><RollbackOutlined /></Button>
      <Button onClick={() => {filterCate('Data Structure')}}className = 'cateButton'>Data Structure</Button>
      <Button onClick={() => {filterCate('Web Development')}}>Web Dev</Button>
    <List
      header={<div>BLOG</div>}
      itemLayout="vertical"
      dataSource={filtered ? filterList : blogList}
      renderItem={(item,index) => (
        <List.Item>
          <Row>
            <Col span = {5}>
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => {
              confirm(item._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" className="deleteButton" size="small" danger>
              &times;
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              editPost(item._id);
            }}
            className="editButton"
            size="small"
          >
            Edit
          </Button>
          {!item.post ? (
            <Button
              type="primary"
              onClick={() => {
                postOrSave(item._id,index);
              }}
              className="postButton"
              size="small"
            >
              Post
            </Button>
          ) : (
            <Button
              type="primary"
              style={{ backgroundColor: "#F8C600" }}
              onClick={() => {
                postOrSave(item._id,index);
              }}
              className="postButton"
              size="small"
            >
              Take Down
            </Button>
          )}</Col>
        
            <Col span={10}>{item.title}</Col>
            <Col span={5}>{item.category}</Col>
            <Col span={4}>{date.format(new Date(item.date), pattern)}</Col>
          </Row>
        </List.Item>
      )}
    />
    
      </>
  );
}
