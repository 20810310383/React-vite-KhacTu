import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {

  const [dataUser, setDataUser] = useState([
    {_id: "tú", fullName: 22, email: "hn"},
    {_id: "dat", fullName: 23, email: "hcm"},
  ])

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
    try {
      const res = await fetchAllUserAPI()
      console.log("res: ", res);
      setDataUser(res.data.data)
    } catch(er) {

    }
  }
  
  console.log("run render 222");

  return (
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
  )
}

export default UserTable