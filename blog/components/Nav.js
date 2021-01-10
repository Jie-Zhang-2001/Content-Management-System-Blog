import { Menu, Dropdown } from "antd";
import { HomeFilled, FileTextFilled } from "@ant-design/icons";
import Link from "next/link";

const Nav = (props) => {
  const { SubMenu } = Menu;
 

  const dropDownMenu = (
    <Menu>
      <Menu.Item key="data-structure">
        <a href="/list?category=Data%20Structure">Data Structure</a>
      </Menu.Item>
      <Menu.Item key="web-development">
        <a href="/">Coming Soon</a>
      </Menu.Item>
      {/* <Menu.Item key="web-development">
        <a href="/list?category=Web%20Development">Web Dev</a>
      </Menu.Item> */}
    </Menu>
  );

  const TopMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeFilled />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>
      <SubMenu
        icon={<FileTextFilled />}
        title="&nbsp;&nbsp;BLOG Topics&nbsp;&nbsp;&nbsp;"
      >
        <Menu.Item key="data-structure">
          <a href="/list?category=Data%20Structure">Data Structure</a>
        </Menu.Item>
        {/* <Menu.Item key="web-development">
          <a href="/list?category=Web%20Development"  >Web Dev</a>
        </Menu.Item> */}
        <Menu.Item key="web-development">
          <a href="/"  >Coming Soon</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
  const BottomMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeFilled />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>
      <Dropdown overlay={dropDownMenu} placement="topCenter">
         <button className='topicButton'><FileTextFilled /> Blog Topics</button>
      </Dropdown>
    </Menu>
  );
  if (!props.bottom) {
    return TopMenu;
  } else {
    return BottomMenu;
  }
};

export default Nav;
