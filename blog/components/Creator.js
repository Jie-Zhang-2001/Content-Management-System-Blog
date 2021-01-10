import { Avatar, Divider } from 'antd';
import {GithubFilled, LinkedinFilled, UserOutlined } from '@ant-design/icons';
import '../public/css/components/creator.css'
const Creator = () => {
    return (
        <div className = 'creator-div'>
            <div><Avatar size={150} src='/image/profile.png' /></div>
            <div className='creator-name'> Jie Zhang </div>
            <div className='creator-description'>
                I'm currently a sophomore student studying in Computer Science at Stony Brook University
            </div>
            <Divider>Contact</Divider>
           <a href="https://github.com/Jie-Zhang-2001"> <GithubFilled/></a> <a href="https://www.linkedin.com/in/jie-zhang-54a2b2160/"><LinkedinFilled /></a> <a href="https://zhang-personal-web.herokuapp.com/"><UserOutlined /></a>

        </div>
    )
}

export default Creator;