import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Creator from "../components/Creator";
import { Col, Row, List, Breadcrumb, BackTop, Spin } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import TopArticles from "../components/TopArticles";
import Footer from "../components/Footer";
import getData from "../utils/getData";
import Link from "next/link";
import BottomNav from '../components/BottomNav'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import date from 'date-and-time';
import {MONGO_DATABASE} from '../constant'
const pattern = date.compile('MMM D YYYY');

export default function MyList(categoryList) {
  const [myList, setMyList] = useState(categoryList.list);
  const [loading, setLoading] = useState(false);


  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer:renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  })
  return (
    <Spin spinning={loading}>
    <div className="container">
      <Head>
        <title>{myList[0].category}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={24} lg={15} xl={15}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/" onClick={() => {setLoading(true)}} >Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{myList[0].category}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div className="main-title">BLOG</div>}
            itemLayout="vertical"
            dataSource={myList}
              renderItem={(item) => (
                <Link href={{ pathname: "/detail", query: { id: item._id } }}>
              <List.Item onClick={() => {setLoading(true)}}>
                  <div className="list-title">{item.title}</div>
                <div className="list-icon">
                  <span className="date">
                    <CalendarOutlined /> {date.format(new Date(item.date), pattern)}
                  </span>
                </div>
                <div className="list-content" dangerouslySetInnerHTML={{__html: marked(item.introduction)}}></div>
                  </List.Item>
                  </Link>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={0} lg={5} xl={6}>
          <Creator />
          <TopArticles />
        </Col>
        <BackTop>
          <div className = 'backTop'>UP</div>
        </BackTop>
        </Row>
        <Footer />
      <BottomNav />
      </div>
      </Spin>
  );
}


MyList.getInitialProps = async (context) => {
  const category = context.query.category;
  const categoryList = await getData(
    MONGO_DATABASE + "/api/articles/category/" + category
  );
  return { list: categoryList.data };
};
