import React from 'react';
import {
  Button, Card, Form, Input, InputNumber,
} from 'antd';
import './index.scss';

const ProductEdit = (props) => {
  const onFinish = (values) => {
    console.log('ok', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('no', errorInfo);
  };
  return (
    <Card title="商品编辑" bordered={false}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="名字"
          name="name"
          rules={[{ required: true, message: '请输入商品名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[
            { required: true, type: 'number', message: '请输入商品名称' },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="价格2"
          name="price2"
          rules={[
            {
              required: true,
              type: 'number',
              validator: (rules, value) => {
                if (value >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('总不能倒贴钱'));
              },
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="价格3"
          name="price3"
          rules={[
            {
              required: true,
              type: 'number',
            },
            ({ getFieldValue }) => ({
              validator: (rules, value) => {
                if (
                  value >= 0
                  && getFieldValue('price2') + getFieldValue('price') < value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('不能小于0，不能少于上方价格之和'),
                );
              },
            }),
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductEdit;
