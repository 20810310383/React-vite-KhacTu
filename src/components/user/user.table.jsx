import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';

const UserTable = (props) => {

  const {dataUser} = props

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null)

  const columns = [
      {
        title: 'ID',
        dataIndex: '_id',   
        render: (_, record) => {
          return (
            <a href='#'> {record._id}</a>
          )
        }     
      },
      {
        title: 'FullName',
        dataIndex: 'fullName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <div style={{display: "flex", gap: "20px"}}>
            <EditOutlined 
            onClick={() => {
              console.log("check record: ", record);
              setDataUpdate(record)
              setIsModalUpdateOpen(true)
            }} 
            style={{cursor: "pointer", color: "orange"}} />
            <DeleteOutlined style={{cursor: "pointer", color: "red"}} />
          </div>
        )
      }
      
  ];

  console.log(">> check data update: ", dataUpdate);

  
  return (
      <>
        <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
        <UpdateUserModal 
          isModalUpdateOpen={isModalUpdateOpen}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />
      </>
  )
}

export default UserTable