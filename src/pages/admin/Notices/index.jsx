/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import 'animate.css';
import './index.scss';

const Notices = () => {
  const [data, setData] = useState([
    {
      id: 0,
      title: 'title0',
      msg: 'This is a test massage. id is 0.',
    },
    {
      id: 1,
      title: 'title1',
      msg: 'This is a test massage. id is 1.',
    },
    {
      id: 2,
      title: 'title2',
      msg: 'This is a test massage. id is 2.',
    },
    {
      id: 3,
      title: 'title3',
      msg: 'This is a test massage. id is 3.',
    },
    {
      id: 4,
      title: 'title4',
      msg: 'This is a test massage. id is 4.',
    },
    {
      id: 5,
      title: 'title5',
      msg: 'This is a test massage. id is 5.',
    },
    {
      id: 6,
      title: 'title6',
      msg: 'This is a test massage. id is 6.',
    },
    {
      id: 7,
      title: 'title7',
      msg: 'This is a test massage. id is 7.',
    },
    {
      id: 8,
      title: 'title8',
      msg: 'This is a test massage. id is 8.',
    },
    {
      id: 9,
      title: 'title9',
      msg: 'This is a test massage. id is 9.',
    },

  ]);
  // eslint-disable-next-line prefer-const
  let id = 2;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const remove1 = (obj) => {
    let { id } = obj;
    const tmpArr = [...data];
    let el = document.getElementsByClassName('ant-table-row ant-table-row-level-0');
    el[id].setAttribute('class', 'ant-table-row ant-table-row-level-0 animate__animated animate__zoomOut');
    setTimeout(() => {
      el[id].style.display = 'none';
    }, 500);
  };
  const remove2 = (obj) => {
    let { id } = obj;
    let el = document.getElementsByClassName('ant-table-row ant-table-row-level-0');
    el[id].style.color = '#454544';
    el[id].style.backgroundColor = '#bfbfbd';
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '14%',
      ...getColumnSearchProps('id'),
    },
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
      render: (value, record) => {
        let { id } = record;
        return (
          <a
            id={id}
            onClick={(e) => {
              console.log(id);
            }}
          >
            {record.msg}
          </a>
        );
      },
    },
    {
      title: 'Actions',
      align: 'center',
      render: (record, index) => (
        <Space>
          <Button
            type="primary"
            danger
            onClick={() => remove1(index, record.id)}
          >
            已读 1
          </Button>
          <Button
            type="primary"
            onClick={() => remove2(index, record.id)}
          >
            已读 2
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
      rowClassName="a"
      rowKey={(record) => record.id}
      size="small"
    />
  );
};
export default Notices;
