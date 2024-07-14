import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, Tag, message, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserModal from './view.user.modal';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {

  const {dataUser, loadUser} = props

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null)

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null)

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Không xoá');
  };

  const columns = [
      {
        title: 'ID',
        dataIndex: '_id',   
        render: (_, record) => {
          return (
            <a href='#' onClick={() => {
              setIsDetailOpen(true)
              setDataDetail(record)
            }}> {record._id}</a>
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

            <Popconfirm
                title="Xóa người dùng"
                description="Bạn chắc chắn xóa user này ?"
                onConfirm={() => handleDeleteUser(record._id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <DeleteOutlined style={{cursor: "pointer", color: "red"}} />
              </Popconfirm>

            
          </div>
        )
      }
      
  ];

  const handleDeleteUser = async (id) => {        
    try {
        const res = await deleteUserAPI(id)
        console.log("check res: ", res);

        if(res.data){
            notification.success({
                message: "xoá user",
                description: "xoá user thành công"
            })
            await loadUser()
        } else {
            notification.error({
                message: "error delete user",
                description: JSON.stringify(res.message)
            })
        }
        console.log("check res.data: ", res.data);    
    } catch(error) {

    }
  }
  // console.log(">> check data update: ", dataUpdate);

  
  return (
      <>
        <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />

        <UpdateUserModal 
          isModalUpdateOpen={isModalUpdateOpen}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          loadUser={loadUser}
        />

        <ViewUserModal 
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          dataDetail={dataDetail}
          setDataDetail={setDataDetail}
          loadUser={loadUser}
        />
      </>
  )
}

export default UserTable