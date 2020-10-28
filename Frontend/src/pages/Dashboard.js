import React from 'react';
import { Affix, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Dashboard() {
    return (
        <>
            Dashboard
            <Affix style={{ position: 'fixed', top: 'calc(100vh - 60px)', right: 40, width: 25, height: 32 }} >
                <Button shape="circle" size="large" type="primary" onClick={() => console.log('Hello')}>
                    <PlusOutlined />
                </Button>
            </Affix>
        </>
    )
}