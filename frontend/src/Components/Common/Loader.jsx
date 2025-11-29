import React from 'react';
import { Space, Spin } from 'antd';

export default function Loader() {
    return (
        <div className="loader-container">
            Loading...
            <Space size="middle">
            <Spin size="large" /> 
            </Space>
        </div>
    );
}