import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { setChatUsers } from '../utils/slice';
import { Select } from 'antd';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [party, setParty] = useState();
  const [renderbutton, setRenderButton] = useState(false);
  const [selecteduser, setSelecteduser] = useState([]);
  const { Option } = Select;
  const dispatch = useDispatch();

  const sender_email = useSelector((state) => state.baseData['email']);

  const responsedata = useSelector((state) => state.baseData['data'][0]);

  const getPartyUsers = (party_name) => {
    const selectedParty = responsedata.find((item) => item.name === party_name);
    setUsers(selectedParty?.users || []);
  };

  const selectParty = (event) => {
    console.log("the event is" , event)
    setSelecteduser([]);
    const selectedPartyName = event || '';
    setParty(selectedPartyName);
    getPartyUsers(selectedPartyName);
  };

  const selectUser = (event) => {
    console.log("tthe data is" , event)
    const selectedOptions = Array.from(event, (option) => option);
    setSelecteduser(selectedOptions);
    setRenderButton(selectedOptions.some((item) => item !== ''));
    dispatch(setChatUsers([...selectedOptions, sender_email]));
  };

  return (
    <div>
      <label>Select a Name:</label>
      <Select
  className="w-auto"
  showSearch
  value={party}
  placeholder="Select Party"
  optionFilterProp="children"
  onChange={selectParty}
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  {responsedata.map((item, index) => (
    <Option key={index} value={item.name}>
      {item.name}
    </Option>
  ))}
</Select>

      <label>Select a User:</label>
<Select
  className="w-100"
  mode="multiple"
  placeholder="Select User"
  value={selecteduser}
  onChange={selectUser}
>
  {users.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ))}
</Select>
      <Button shouldRenderButton={renderbutton} />
    </div>
  );
};
export default UserList;
