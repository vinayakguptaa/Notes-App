import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import {
    UserOutlined,
    LeftOutlined,
    RightOutlined,
    PaperClipOutlined
} from '@ant-design/icons';

const { Sider } = Layout;


export default function Sidebar() {
    const [collapse, setCollapse] = useState(true);
    return (
        <>
            <Sider
                breakpoint="md"
                onBreakpoint={broken => {
                    console.log(broken);
                    setCollapse(broken);
                }}
                trigger={null}
                collapsedWidth="0"
                collapsed={collapse}
                style={{ height: '100vh', position: 'sticky', top: 0, left: 0 }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<PaperClipOutlined />}>
                        Dashboard
              <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        Account
              <Link to="/account" />
                    </Menu.Item>
                </Menu>
            </Sider>
            <div className="trigger" onClick={() => setCollapse(!collapse)}>
                {collapse ? <RightOutlined /> : <LeftOutlined />}
            </div>
        </>
    )
}