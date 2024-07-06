import { Drawer } from "antd"
import { useState } from "react";


const ViewUserModal = (props) => {

    const {isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail} = props  

    return (
        <Drawer title="Chi tiết User"
            onClose={() => {
                setDataDetail(null)
                setIsDetailOpen(false)
            }} 
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Full name: {dataDetail.fullName}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone number: {dataDetail.phone}</p>
            </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )

}

export default ViewUserModal