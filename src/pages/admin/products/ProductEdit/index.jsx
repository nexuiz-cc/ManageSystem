import {
  Button, Card, Form, Input, InputNumber,
} from 'antd';
import './index.scss';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  findProductDetail,
  modifyProductOne,
} from '../../../../services/products';

const ProductEdit = (props) => {
  const { id } = useParams(); // 获取路由跳转传入id
  const [form] = Form.useForm(); // 表单ref引用
  const navigate = useNavigate();
  // 编辑时，读到的数据，写入到表单元素上
  useEffect(() => {
    if (id) {
      // 读到的数据，写入到表单元素上
      findProductDetail(id).then((res) => form.setFieldsValue(res));
    }
  }, [id, form]);

  const onFinish = async (values) => {
    if (id) {
      // 编辑提交
      await modifyProductOne(id, values);
    } else {
      // 新增提交
      await createProduct(values);
    }
    navigate('/admin/product-list');
  };
  const onFinishFailed = (errorInfo) => {

  };
  return (
    <Card
      title="商品编辑"
      bordered={false}
      extra={<Button onClick={() => navigate(-1)}>返回</Button>}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
