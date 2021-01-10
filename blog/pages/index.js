import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Creator from '../components/Creator'
import { Col, Row, List, BackTop, Spin, Pagination, Affix } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import '../public/css/pages/index.css'
import TopArticles from '../components/TopArticles'
import Footer from '../components/Footer'
import getData from '../utils/getData'
import Link from 'next/link';
import BottomNav from '../components/BottomNav'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import date from 'date-and-time';
import {MONGO_DATABASE} from '../constant'
const pattern = date.compile('MMM D YYYY');

export default function Home (list) {
  const [myList, setMyList] = useState(list.list);
  const [loading, setLoading] = useState(false);
  const [countDocuments, setCount] = useState();
  const renderer = new marked.Renderer();
  
  const pageChange = async (page) => {
    const articlesList = await getData(MONGO_DATABASE + '/api/articles/page/' + page);
    setMyList(articlesList.data);
  }

  const count = async () => {
    const count = await getData(MONGO_DATABASE + '/api/articles/count');
    setCount(count.data);
  }

  useEffect(() => {
    count();
  }, [])
  
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
    <div className="container">
      <Head>
        <title>Personal Learning Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spin spinning={loading}>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={24} lg={15} xl={15}>
          <List header={<div className = 'main-title'>BLOG</div>}
            itemLayout='vertical'
            dataSource={myList}
            renderItem={item => (
              <Link href={{ pathname: '/detail', query: { id: item._id } }}>
              <List.Item onClick={() => { setLoading(true) }}>
                <div className='list-title'>
                      {item.title}
                </div>
                <div className='list-icon'>
                  <span className="date"><CalendarOutlined />{date.format(new Date(item.date), pattern)}</span>
                </div>
                <div className='list-content' dangerouslySetInnerHTML={{__html: marked(item.introduction)}}></div>
                  </List.Item>
                </Link>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={0} lg={5} xl={6}>
          <Creator />
          <TopArticles />
        </Col>
        </Row>
        <Affix offsetBottom={42}>
          <div className = 'pagination'>
            <Pagination defaultCurrent={1} total={countDocuments} defaultPageSize={5} onChange={pageChange} />
          </div>
        </Affix>
        <Footer />
        </Spin>
      <BottomNav />
      <BackTop>
          <div className = 'backTop'>UP</div>
      </BackTop>
    </div>
  )
}

Home.getInitialProps = async () => {
  const articlesList = await getData(MONGO_DATABASE + '/api/articles/page/1');
  return { list: articlesList.data};
}




