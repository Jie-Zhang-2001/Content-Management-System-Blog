import Nav from './Nav';
import {Row, Col, Affix} from 'antd'

const BottomNav = () => {
    return (
        <Row type='flex' justify='center'>
        <Col className='bottom-nav' xs={24} sm={24} md={0} lg={0} xl={0}>
        <Affix offsetBottom={0}>
            <Nav bottom={true}/>
          </ Affix>
        </Col>
      </Row>
    )

}

export default BottomNav;