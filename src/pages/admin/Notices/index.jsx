/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  Button, Input, Space, Table, Form, Modal,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import Highlighter from 'react-highlight-words';
import './index.scss';

const Notices = () => {
  const [data, setData] = useState([
    {
      title: 'title1',
      msg: 'eslint-disable-next-line import/no-extraneous-dependencies',
    },
    {
      title: 'title2',
      msg: 'eslint-disable-next-line import/no-extraneous-dependencies',
    },
    {
      title: 'title3',
      msg: 'eslint-disable-next-line import/no-extraneous-dependencies',
    },
    {
      title: 'title4',
      msg: 'eslint-disable-next-line import/no-extraneous-dependencies',
    },

  ]);
  // eslint-disable-next-line prefer-const
  let id = 2;
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const remove = (index, id) => {
    // id 操作数据库 ajax
    const tmpArr = [...data];
    tmpArr.splice(index, 1);
    setData(tmpArr);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        className="searchdiv"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'flex',
            justifyContent: 'right',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    )),
  });
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '14%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Message',
      dataIndex: 'msg',
      key: 'msg',
      width: '15%',
      ...getColumnSearchProps('msg'),
    },
    {
      title: 'Actions',
      align: 'center',
      render: (record, index) => (
        <Space>
          <Button
            type="primary"
            danger
            onClick={() => remove(index, record.id)}
          >
            已读 1
          </Button>
        </Space>
      ),
      width: '25%',
    },
  ];
  return (
    <Table
      dataSource={[...data]}
      columns={columns}
      rowKey={(record) => record.id}
      size="small"
    />
  );
};
export default Notices;
