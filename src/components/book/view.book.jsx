import { Button, Drawer, Space } from "antd"
import { useState } from "react";


export const ViewBookModal = (props) => {

    const {
        isDetailOpen, setIsDetailOpen,
        dataDetail, setDataDetail
    } = props

    const [placement, setPlacement] = useState('left');
    const [size, setSize] = useState("large");

    
    const onClose = () => {
        setIsDetailOpen(false);
        setDataDetail(null)
    };

    // Hàm định dạng giá tiền
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
    };

    // format số lượng
    const formatQuantity = (value) => {
        return value.toLocaleString('vi-VN');
    };

    return (
        <Drawer
            placement="right"
            size={size}
            onClose={onClose}
            open={isDetailOpen}        
        >
            {dataDetail ? 
                <>
                    <p style={{fontSize: "25px"}}>ID: <span style={{color: "red", fontSize: "20px"}}>{dataDetail._id}</span></p>
                    <p style={{fontSize: "25px"}}>Tiêu đề: <span style={{color: "red", fontSize: "20px"}}>{dataDetail.mainText}</span></p>
                    <p style={{fontSize: "25px"}}>Tác giả: <span style={{color: "red", fontSize: "20px"}}>{dataDetail.author}</span></p>
                    <p style={{fontSize: "25px"}}>Thể loại: <span style={{color: "red", fontSize: "20px"}}>{dataDetail.category}</span></p>
                    <p style={{fontSize: "25px"}}>Giá tiền: <span style={{color: "red", fontSize: "20px"}}>{formatCurrency(dataDetail.price)}</span></p>
                    <p style={{fontSize: "25px"}}>Số lượng: <span style={{color: "red", fontSize: "20px"}}>{formatQuantity(dataDetail.quantity)}</span></p>
                    <p style={{fontSize: "25px"}}>Đã bán: <span style={{color: "red", fontSize: "20px"}}>{formatQuantity(dataDetail.sold)}</span></p>
                    <p style={{fontSize: "25px"}}>Hình ảnh: </p>
                    <img width={400} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                </> 
                : 
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
            
        </Drawer>
    )
}