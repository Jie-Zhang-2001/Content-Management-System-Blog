import React, {useState} from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined,KeyOutlined} from '@ant-design/icons'
import '../static/css/login.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom'
import auth from '../auth'
import { MONGO_DATABASE } from '../url';
const cookies = new Cookies();

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const checkLogin = async () => {
        setIsLoading(true);
        if (!userName) {
            message.error('Please Enter Your Username!');
            setTimeout(() => {
                setIsLoading(false)
            },300)
            return false;
        } else if (!password) {
            message.error('Please Enter Your Password!');
            setTimeout(() => {
                setIsLoading(false)
            },300)
            return false;
        } 
        const data = await axios.post(MONGO_DATABASE + '/admin/login', { username: userName, password });
        if (data.data.error) {
            message.error('Please Check Your Username and Password!')
            setIsLoading(false);
        } else {
            cookies.set('token', data.data, {maxAge: 60*60*60});
            auth.login(() => {
                props.history.push('/admin/');
            })
        }
    }

    return (
        <div className='login-div'>
            <Spin tip='Logging in...' spinning={isLoading} style={{height:'500px'}}>
                <Card title='Jie Zhang Blog System' bordered={true} >
                    <Input
                        id='username'
                        size='large'
                        placeholder='Enter Your Username'
                        prefix={<UserOutlined />}
                        onChange = {(e) => {setUserName(e.target.value)}}
                    />
                   
                    <Input.Password
                        id='password'
                        size='large'
                        placeholder='Enter Your Password'
                        prefix={<KeyOutlined />}
                        onChange = {(e) => {setPassword(e.target.value)}}
                    />
    
                    <Button type='primary' size='large' block onClick={checkLogin}>Login</Button>
                   
                </Card>
            </Spin>
        </div>
    )
}

export default withRouter(Login)