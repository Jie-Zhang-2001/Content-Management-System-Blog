import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/addArticle.css";
import '../static/css/markdown.css'
import { MONGO_DATABASE } from '../url';
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;


function AddArticle(props) {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [markdownContent, setMarkDownContent] = useState("Preview Content");
  const [intro, setIntro] = useState("");
  const [introMarkdown, setintroMarkdown] = useState("Preview Introduction");
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [editable, setEdit] = useState(false);


  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    table: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const submitBlog = async (saveOrSubmit) => {
    const blog = {
      title: articleTitle,
      content: articleContent,
      category: category,
      date: date,
      introduction: intro,
      post:saveOrSubmit
    }
    let data;
    if (editable) {
       data = await axios.patch(MONGO_DATABASE + '/admin/edit', {id: props.history.location.state.id, info: blog});
    } else {
       data = await axios.post(MONGO_DATABASE + '/admin/add', blog);
    }
    if (data.data.message) {
      message.error(data.data.message);
    } else {
      if (editable) {
        saveOrSubmit ? message.success('Edits Successfully Posted!') : message.success('Edits Successfully Saved!')
        localStorage.setItem('selected', 'All Blog')
        localStorage.setItem('selectedIndex', '2')
        props.history.push('/admin/all')
      } else {
        saveOrSubmit ? message.success('Successfully Created!') : message.success('Successfully Saved!')
        localStorage.setItem('selected', 'All Blog')
        localStorage.setItem('selectedIndex', '2')
        props.history.push('/admin/all')
      }
     
    }
  }
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkDownContent(html);
    };
    
    const changeIntro = (e) => {
        setIntro(e.target.value);
        let html = marked(e.target.value);
        setintroMarkdown(html);
  }
  
  function onDateChange(dateString) {
    console.log(dateString);
    // setDate(dateFormat.format(new Date(dateString), pattern));
    setDate(dateString);
  }

  function onCategoryChange(value) {
    setCategory(value);
  }
  const getById = async (id) => {
    const article = await axios.get(MONGO_DATABASE + '/admin/' + id);
    return article;
  }

  useEffect(() => {
    const findId = async () => {
      if (props.history.location.state && props.history.location.state.id) {
        const articleObject = await getById(props.history.location.state.id);
        const article = articleObject.data;
        setArticleContent(article.content);
        setMarkDownContent(marked(article.content));
        setintroMarkdown(marked(article.introduction));
        setArticleTitle(article.title);
        setIntro(article.introduction);
        setCategory(article.category);
        setDate(article.date);
        setEdit(true);
        
      }
    }
    findId();
  },[])

  return (
    
    <div>
      <Row gutter={5} justify="space-around">
        <Col span={18}>
          <Row gutter={[5, 15]}>
            <Col span={20}>
              <Input placeholder="Blog Title" onChange={(e) => { setArticleTitle(e.target.value) }} value={articleTitle} size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue="Choose a Category" value={category} onChange={onCategoryChange} size="large">
                <Option value="Data Structure">Data Structure</Option>
                <Option value="Web Development">Web Development</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={32}
                placeholder="Blog Content"
                onChange={changeContent}
                value={articleContent}
             />
            </Col>
            <Col span={12}>
              <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={5}>
          <Row gutter={[15, 15]}>
            <Col>
              <Button onClick={() => { submitBlog(false) }} size="large">SAVE</Button>
            </Col>
            <Col>
              <Button onClick={() => { submitBlog(true) }} size="large" type="primary">
                POST
              </Button>
            </Col>
            {editable && <Col>
              <div className = 'editing'>
                Editing...
              </div>
            </Col> }
            
          </Row>
          <Row>
            <TextArea rows={6} placeholder="Introduction" value={intro} onChange={changeIntro}></TextArea>
          </Row>
          <Row>
            <div className="markdown-introduction" dangerouslySetInnerHTML={{__html: introMarkdown}}></div>
          </Row>
          <Row>
            <DatePicker className="date" placeholder="Date" size="large"  onChange={onDateChange} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
