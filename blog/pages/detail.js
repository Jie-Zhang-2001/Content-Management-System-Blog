import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Col, Row, Breadcrumb, BackTop, Spin, Affix } from "antd";
import { CalendarOutlined, FileSearchOutlined } from "@ant-design/icons";
import Creator from "../components/Creator";
import Footer from "../components/Footer";
import TopArticles from "../components/TopArticles";
import "../public/css/pages/comm.css";
import "../public/css/pages/detail.css";
import "../public/css/pages/markdown.css";
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import getData from "../utils/getData";
import Link from "next/link";
import BottomNav from "../components/BottomNav";
import date from "date-and-time";
import {MONGO_DATABASE} from '../constant'
const pattern = date.compile("MMM D YYYY");

export default function Detail(props) {
  const [markedContent, setMarkedContent] = useState();
  const [loading, setLoading] = useState(false);
  const [markNav, setNav] = useState([]);
  const [anchorID, setID] = useState([]);
  const renderer = new marked.Renderer();

 
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    },
  });

  useEffect(() => {
    setMarkedContent(marked(props.content));
    const titleList = props.content.split("## ");
    const navList = [];
    const navIdList = [];
    let regex = /\s/g;
    for (let i = 1; i < titleList.length; i++) {
      const str = titleList[i]
        .split("\n", 1)[0]
        .toLowerCase()
        .replace(") ", " ")
        .replace("?", "");
      navIdList.push("#" + str.replace(regex, "-"));
      navList.push(titleList[i].split("\n", 1)[0]);
    }
    setID(navIdList);
    setNav(navList);
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="container">
        <Head>
          <title>{props.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={24} lg={15} xl={15}>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      setLoading(true);
                    }}
                    href="/"
                  >
                    Home
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link
                    href={{
                      pathname: "/list",
                      query: { category: props.category },
                    }}
                  >
                    <a
                      onClick={() => {
                        setLoading(true);
                      }}
                    >
                      {props.category}
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detail-title">{props.title}</div>
              <div className="detail-icon">
                <span className="date">
                  <CalendarOutlined />{" "}
                  {date.format(new Date(props.date), pattern)}
                </span>
              </div>
            </div>
            <p
              className="detail-content"
              dangerouslySetInnerHTML={{ __html: markedContent }}
            ></p>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={0} lg={5} xl={6}>
            <Creator />
            <TopArticles />
            <Affix offsetTop={5}>
              <div className="NavBox">
                <h1><FileSearchOutlined />  Section Navigation</h1>
                {markNav.map((item, index) => (<a  key={index} className="markNav" href={anchorID[index]}>{item}</a>))}
          </div>
              
            </Affix>
          </Col>
          <BackTop>
            <div className="backTop">UP</div>
          </BackTop>
        </Row>
        <Footer />
        <BottomNav />
      </div>
    </Spin>
  );
}
Detail.getInitialProps = async (context) => {
  const id = context.query.id;
  const detailArticle = await getData(
    MONGO_DATABASE +"/api/articles/" + id
  );
  return detailArticle.data;
};
