import React, {useState} from "react";
import "../public/css/components/header.css";
import { Row, Col } from "antd";
import Link from "next/link";
import Nav from './Nav';

const Header = () => {
  const [bottom, setBottom] = useState(10);
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={14}>
          <span className="header-logo">
            <Link href="/">
              <a>Jie Zhang</a>
            </Link>
          </span>
          <span className="header-text">Personal Learning Experience</span>
        </Col>
        <Col xs={0} sm={0} md={12} lg={9} xl={8}>
          <Nav />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
