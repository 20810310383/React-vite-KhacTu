import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Table, message, notification } from "antd"
import { useState } from "react";
import { ViewBookModal } from "./view.book";
import { BookCreate } from "./book.create";
import { BookUpdate } from "./book.update";
import { deleteBookAPI } from "../../services/api.book";


export const BookTable = (props) => {

  const { dataBook, setDataBook, 
          current, setCurrent,
          pageSize, setPageSize,
          total, setTotal,
          loadBook, loadingTable, setLoadingTable
  } = props

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null)
  // const [loadingTable, setLoadingTable] = useState(false)



  console.log("current: ",current);
  console.log("pageSize: ",pageSize);

  // Hàm định dạng giá tiền
  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
  };

  // format số lượng
  const formatQuantity = (value) => {
    return value.toLocaleString('vi-VN');
  };

  const dataSource = [
      {
        stt: '1',
        _id: '123456',
        mainText: "tến sản phẩm",
        price: 100000,
        quantity: 10,
        author: 'Đỗ Khắc Tú',
        action: '10 Downing Street',
      },        
    ];
    
  const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
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
      title: 'Mã Sản Phẩm',
      dataIndex: '_id',
      key: '_id',
      render: (_, record) => {
        console.log("record: ",record);
        return (
          <>
            <a href="#" onClick={() => {
              setIsDetailOpen(true)
              setDataDetail(record)
            }}>
                {record._id}
            </a>
          </>
        )
      } 
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'mainText',
      key: 'mainText',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price)
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity) => formatQuantity(quantity)
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (          
          <Space size="middle">

            <EditOutlined style={{color: "orange"}} onClick={() => {
              console.log("record update: ", record);
              setIsModalUpdate(true)
              setDataUpdate(record)
            }} /> 

          <Popconfirm
              title="Xoá sản phẩm Book"
              description="Bạn có chắc chắn muốn xoá?"
              onConfirm={() => {handleDeleteBook(record._id)}}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{color: "red"}} />
            </Popconfirm>
            
          </Space>
        ),
    },
  ];

  const handleDeleteBook = async (id) => {
      try {
        const res = await deleteBookAPI(id)
        console.log("check res: ", res);

        if(res.data){
            notification.success({
                message: "xoá book",
                description: "xoá book thành công"
            })
            await loadBook()
        } else {
            notification.error({
                message: "error delete book",
                description: JSON.stringify(res.message)
            })
        }
        console.log("check res.data: ", res.data);    
      } catch(error) {

      }
  }

  const cancel = (e) => {
    console.log(e);
    message.error('Huỷ xoá');
  };

  const onChange = (pagination) => {
    console.log(">> check: pagination", pagination);

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

  }

    return (
        <>
            <Table 
                rowKey={"_id"} 
                dataSource={dataBook} 
                columns={columns} 
                pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                } }
                onChange={onChange}
                loading={loadingTable}
            />;

            <ViewBookModal 
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            
            />

            <BookUpdate 
                loadBook={loadBook}
                isModalUpdate={isModalUpdate}
                setIsModalUpdate={setIsModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

        </>
    )
}