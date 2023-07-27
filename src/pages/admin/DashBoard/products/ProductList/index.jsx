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
import { connect } from 'react-redux';
import {
  Button, Input, Space, Table, Form, Modal,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import Highlighter from 'react-highlight-words';
import './index.scss';
import { newData } from '../../../../../store/actions/count';

const ProductList = ({ tableData, dispatch }) => {
  const [data, setData] = useState(tableData);
  // eslint-disable-next-line prefer-const
  let id = 2;
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [checkName, setCheckName] = useState('');
  const [checkCountry, setCheckCountry] = useState('');
  const [checkTel, setCheckTel] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [isCheckFrame, setIsCheckFrame] = useState(false); // modal
  const [now, setNow] = useState(0); // list数据里面要被修改的索引
  const select = (index) => {
    setIsCheckFrame(true);
    setNow(index);
    setCheckName(data[index].name);
    setCheckCountry(data[index].country);
    setCheckTel(data[index].tel);
    setCheckAddress(data[index].address);
  };
  const check = () => {
    const tmpArr = [...data];
    tmpArr.splice(now, 1, {
      ...data[now],
      name: checkName,
      country: checkCountry,
      tel: checkTel,
      address: checkAddress,
    });
    setData(tmpArr);
    setIsCheckFrame(false);
  };

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '14%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: '15%',

      ...getColumnSearchProps('age'),
    },
    {
      title: 'Tel',
      dataIndex: 'tel',
      required: true,
      key: 'tel',
      ...getColumnSearchProps('tel'),
      width: '20%',

    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      width: '20%',
    },
    {
      title: 'Actions',
      align: 'center',
      render: (text, record, index) => (
        <Space>
          <Button type="primary" onClick={() => select(index)}>
            Change
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => remove(index, record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: '25%',
    },
  ];
  const add = ({
    name, address, country, tel,
  }) => {
    dispatch(newData(name, address, country, tel));
    form.setFieldsValue({ name: '' });
    form.setFieldsValue({ address: '' });
    form.setFieldsValue({ country: '' });
    form.setFieldsValue({ tel: '' });
    setIsModalOpen(false);
  };

  return (
    <>
      <h3>TO-DO-LIST|curd</h3>
      <Button type="primary" className="addbtn" onClick={showModal}>
        Click here to add data.
      </Button>
      <Table
        dataSource={[...data]}
        columns={columns}
        rowKey={(record) => record.id}
        size="small"
      />
      <Modal
        open={isModalOpen}
        onOk={add}
        okButtonProps={{ className: 'okbtn', htmlType: 'submit' }}
        cancelButtonProps={{ className: 'cancelbtn' }}
        onCancel={handleCancel}
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} preserve onFinish={add}>
          <div className="divTable gry">
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableTH">Name</div>
                <div className="divTableTH">Country</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Name is required.' }, {
                      pattern: /^[a-zA-Z]+ [a-zA-Z]+$/, message: 'Invalid name given.',
                    },
                    ]}
                  >
                    <Input placeholder="Enter your name" className="ipt" />
                  </Form.Item>
                </div>
                <div className="divTableCell">
                  {' '}
                  <Form.Item
                    name="country"
                    rules={[
                      { required: true, message: 'Country is required.' },
                    ]}
                  >
                    <Input placeholder="Enter your country" className="ipt" />
                  </Form.Item>
                </div>
              </div>
              <div className="divTableRow">
                <div className="divTableTH">Phone Number</div>
                <div className="divTableTH">Address</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">
                  {' '}
                  <Form.Item
                    name="tel"
                    rules={
                      [
                        { required: true, message: '070|080|090-xxxx-xxxx is required.' }, { pattern: /^(070|080|090)-\d{4}-\d{4}$/, message: 'Tel start with 070|080|090.' },
                      ]
                    }
                  >
                    <Input placeholder="Enter your tel" className="ipt2" />
                  </Form.Item>
                </div>
                <div className="divTableCell">
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: 'Address is required.' },
                    ]}
                  >
                    <Input
                      className="address"
                      placeholder="Enter your address"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <Button type="primary" className="confirmbtn" htmlType="submit">
            Add Data
          </Button>
        </Form>
      </Modal>

      <Space
        direction="vertical"
        size="middle"
        style={{ display: 'flex' }}
      />

      {isCheckFrame && (
        <Modal
          open={isCheckFrame}
          okButtonProps={{ className: 'okbtn' }}
          cancelButtonProps={{ className: ' cancelnewbtn' }}
          onCancel={() => setIsCheckFrame(false)}
          cancelText="Cancel"
          onOk={check}
        >
          <table className="confirmtable">
            <tr>
              <td colSpan={2}>
                You are changing
                {' '}
                <span className="modalspan">
&nbsp;
                  {data[now].name}
&nbsp;
                </span>
                's info.
              </td>
            </tr>
            <tr>
              <td>&nbsp;Name</td>
              <td>&nbsp;Country</td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  className="modalIpt"
                  onChange={(ev) => setCheckName(ev.target.value)}
                  placeholder={checkName}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="modalIpt"
                  onChange={(ev) => setCheckCountry(ev.target.value)}
                  placeholder={checkCountry}
                />
              </td>
            </tr>
            <tr>
              <td>&nbsp;Phone Number</td>
              <td>&nbsp;Address</td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  className="modalIpt"
                  onChange={(ev) => setCheckTel(ev.target.value)}
                  placeholder={checkTel}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="modalIpt"
                  onChange={(ev) => setCheckAddress(ev.target.value)}
                  placeholder={checkAddress}
                />
                <Button
                  type="primary"
                  className="confirmnewbtn"
                  onClick={check}
                >
                  Confirm
                </Button>
              </td>
            </tr>
          </table>
        </Modal>
      )}
    </>
  );
};
export default connect((state) => ({ tableData: state.tableData }))(ProductList);
