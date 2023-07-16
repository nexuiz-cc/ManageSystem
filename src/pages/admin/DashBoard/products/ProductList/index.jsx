import "./index.scss";
import { Button, Table, Space, Popconfirm, Card, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  delProductOne,
  findProductsList,
  modifyProductOne,
} from "../../../../services/products";
import { serverUrl } from "../../../../config";
const ProductList = (props) => {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); //总条数

  const defaultPer = 3; //一页显示3条

  const loadData = (page, per = defaultPer) => {
    findProductsList(page, per).then((res) => {
      console.log(res.products);
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
  };

  useEffect(loadData, []);

  const columns = [
    {
      title: "序号",
      render: (text, row, index) => index + 1,
    },
    {
      title: "主图",
      render: (text, row, index) =>
        row.coverImg ? (
          <img
            alt="主图"
            src={serverUrl + row.coverImg}
            style={{ width: 50 }}
          />
        ) : (
          "暂无主图"
        ),
    },
    {
      title: "产品名称",
      dataIndex: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "状态",
      dataIndex: "price",
      render: (text, row, index) => (
        <Switch
          defaultChecked={row.onSale}
          onChange={() => onChange(row._id, row.onSale, index)}
        />
      ),
    },
    {
      title: "操作",
      render: (text, row, index) => (
        <>
          <Space>
            <Button
              type="default"
              onClick={() => navigate(`/admin/product-edit/${row._id}`)}
            >
              修改
            </Button>
            <Popconfirm
              title="确认要删除么?"
              onConfirm={() => confirm(row._id, row.onSale, index)}
              onCancel={cancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger type="primary">
                删除
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const onChange = async (_id, onSale, index) => {
    //请求 修改一条库数据， 里面的onSale, 再修改本地数据
    await modifyProductOne(_id, { onSale: !onSale });
    let tmpArr = [...dataSource];
    tmpArr.splice(index, 1, { ...tmpArr[index], onSale: !onSale });
    setDataSource(tmpArr);
  };

  const confirm = async (_id, onSale, index) => {
    //删除一条商品
    await delProductOne(_id);
    const tmpArr = [...dataSource];
    tmpArr.splice(index, 1);
    setDataSource(tmpArr);
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <Card
      title="商品列表"
      bordered={false}
      extra={
        <Button type="primary" onClick={() => navigate("/admin/product-edit")}>
          新增
        </Button>
      }
    >
      <Table
        dataSource={dataSource}
        columns={columns}
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
