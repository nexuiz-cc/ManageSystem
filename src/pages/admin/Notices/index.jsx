import './index.scss';
import {
  Button, Card, List, Avatar,
} from 'antd';
import React, { useState } from 'react';
import pubsub from 'pubsub-js';

const Notices = (props) => {
  const [noticesCount, setNoticesCount] = useState(4);
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  const checkNotices = (val) => {
    if (val === 'clear') {
      setNoticesCount(0);
      // 发布
      pubsub.publish('is-has-notices', 0);
    } else {
      setNoticesCount(noticesCount - val);
      // 发布
      pubsub.publish('is-has-notices', noticesCount - val);
    }
  };

  return (
    <Card
      title="通知中心"
      bordered={false}
      extra={<Button onClick={() => checkNotices('clear')}>全部已读</Button>}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[<Button onClick={() => checkNotices(1)}>已读</Button>]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Notices;
