import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {

  const [dataUser, setDataUser] = useState([])

  // empty arr => run one
  useEffect(() => {
    console.log("run useEffect 111");
    loadUser()
  }, [])

  const columns = [
      {
        title: 'ID',
        dataIndex: '_id',        
      },
      {
        title: 'FullName',
        dataIndex: 'fullName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      
  ];

  const loadUser = async () => {
      const res = await fetchAllUserAPI()
      console.log("res: ", res);
      setDataUser(res.data.data)
  }
  
  console.log("run render 222");

  return (
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
  )
}

export default UserTable