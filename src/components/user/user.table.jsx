import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, Tag, message, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserModal from './view.user.modal';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {

  const {dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize} = props

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
        title: "STT",
        render: (_, record, index) => {
          console.log("index: ", index+1);
          return (
            <>
              {(index+1) + (current - 1) * pageSize}
            </>
          )
        }  
      },
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
  const onChange = (pagination, filters, sorter, extra) => { 
    // setCurrent, setPageSize
    console.log(">> check: pagination, filters, sorter, extra", pagination, filters, sorter, extra);

    // nếu thay dổi trang: current
    if(pagination && pagination.current){
        if( +pagination.current !== +current){
            setCurrent( +pagination.current) // ví dụ "5" -> 5
        }
    }

    // nếu thay đổi tổng số phần tử
    if(pagination && pagination.current){
      if( +pagination.pageSize !== +pageSize){
        setPageSize( +pagination.pageSize) // ví dụ "5" -> 5
      }
    }

  };
  
  return (
      <>
        <Table  columns={columns} 
                dataSource={dataUser} 
                rowKey={"_id"} 
                pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                } }
                onChange={onChange}
        
        />

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