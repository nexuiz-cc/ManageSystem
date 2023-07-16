import './index.scss';
import {
  Button, Table, Space, Popconfirm, Card,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { findProductsList } from '../../../../services/products';
import serverUrl from '../../../../config';

const ProductList = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数

  const defaultPer = 3; // 一页显示3条
  const confirm = (e) => {

  };
  const cancel = (e) => {

  };
  const loadData = (page, per = defaultPer) => {
    findProductsList(page, per).then((res) => {
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
  };

  useEffect(loadData, []);

  const columns = [
    {
      title: '序号',
      render: (text, row, index) => index + 1,
    },
    {
      title: '主图',
      render: (text, row, index) => (row.coverImg ? (
        <img
          alt="主图"
          src={serverUrl + row.coverImg}
          style={{ width: 50 }}
        />
      ) : (
        '暂无主图'
      )),
    },
    {
      title: '产品名称',
      dataIndex: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'price',
      render: (text, row, index) => (row.onSale ? '已上架' : '已下架'),
    },
    {
      title: '操作',
      render: (text, row, index) => (
        <Space>
          <Button
            type="default"
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => navigate(`/admin/product-edit/${row._id}`)}
          >
            修改
          </Button>
          <Popconfirm
            title="确认要删除么?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
          >
            <Button danger type="primary">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="商品列表"
      bordered={false}
      extra={(
        <Button type="primary" onClick={() => navigate('/admin/product-edit')}>
          新增
        </Button>
      )}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        // eslint-disable-next-line no-underscore-dangle
        rowKey={(row) => row._id}
        pagination={{
          onChange: loadData,
          total,
          pageSize: defaultPer,
        }}
      />
    </Card>
  );
};

export default ProductList;
