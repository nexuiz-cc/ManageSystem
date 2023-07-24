/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable default-param-last */
// state
// const state = 10;

// reducer
import { add } from '../actions/list';
import { NEW, CHANGE, DELETE } from '../constants/count';

// eslint-disable-next-line default-param-last
let arr = [
  {
    id: 1,
    name: 'Carrie Carter',
    address: '607 Rothesay Ave',
    country: 'USA',
    tel: '012-3456-7890',
  },
  {
    id: 2,
    name: 'Larue Morissette',
    address: '1348 Weber St E',
    country: 'UK',
    tel: '031-7643-4567',
  },
];
const newData = (name, address, country, tel) => {
  const ID = arr.length + 1;
  const obj = {
    id: ID,
    name: name,
    address: address,
    country: country,
    tel: tel,
  };
  arr.push(obj);
};

const tableData = (state = arr, {
  type, name, address, country, tel,
}) => {
  switch (type) {
    case NEW:
      newData(name, address, country, tel);
      return state;
    default:
      return state;
  }
};

export default tableData;
