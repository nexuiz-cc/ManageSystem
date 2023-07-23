import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './dashboard.scss';

const { Meta } = Card;

const DashBoard = () => {
  return (
    <div>
      <h3>MyDashBoard</h3>
      <div className="wapper">
        <Link to="/admin/product-list">
          <Card
            hoverable
            className="card"
            cover={<img alt="dashBoard" src="https://assets.justinmind.com/wp-content/uploads/2019/10/list-ui-design-ecommerce-dashboard.png" />}
          >
            <Meta title="To ProductList" />
          </Card>
        </Link>
        <Link to="/admin/a/a-1">
          <Card
            hoverable
            className="card"
            href="/admin/product-list"
            cover={<img alt="dashBoard" src="https://assets.justinmind.com/wp-content/uploads/2019/10/list-ui-design-ecommerce-dashboard.png" />}
          >
            <Meta title="To ProductEdit" />
          </Card>
        </Link>
        <Link to="/admin/product-list">
          <Card
            hoverable
            className="card"
            href="/admin/product-list"
            cover={<img alt="dashBoard" src="https://assets.justinmind.com/wp-content/uploads/2019/10/list-ui-design-ecommerce-dashboard.png" />}
          >
            <Meta title="To ProductList" />
          </Card>
        </Link>
      </div>

    </div>
  );
};

export default DashBoard;
