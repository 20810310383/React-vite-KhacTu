import { useEffect, useState } from "react"
import { Input, Modal, notification } from 'antd';
import { updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {
    const [id, setId] = useState("") 
    const [fullName, setFullName] = useState("") 
    const [phoneNumber, setPhoneNumber] = useState("") 

    const {isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    // next dataUpdate != prev dataUpdate
    useEffect(() => {
        console.log(">> check data update props: ", dataUpdate);
        if(dataUpdate){
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhoneNumber(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleClickBtn = async () => {        
        try {
            const res = await updateUserAPI(id, fullName, phoneNumber)
            console.log("check res: ", res);

            if(res.data){
                notification.success({
                    message: "update user",
                    description: "cập nhật user thành công"
                })
                resetAndCloseModal()
                await loadUser()
            } else {
                notification.error({
                    message: "error update user",
                    description: JSON.stringify(res.message)
                })
            }
            console.log("check res.data: ", res.data);    
        } catch(error) {

        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setFullName("")
        setId("")
        setPhoneNumber("")
        setDataUpdate(null)  // khi tắt modal đi rồi ấn edit lại thì thông tiên data vẫn còn trên input
    }

    

    return (
        <Modal  title="Update a User" 
                open={isModalUpdateOpen} 
                onOk={handleClickBtn} 
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Xác nhận chỉnh sửa"}
                >
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id} 
                        disabled />                   
                </div>
                <div>
                    <span>Full name</span>
                    <Input 
                        value={fullName} 
                        onChange={(e) => {setFullName(e.target.value)}} />
                </div>                               
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phoneNumber} 
                        onChange={(e) => {setPhoneNumber(e.target.value)}} />
                </div>
            </div>        
            
        </Modal>
    )
}

export default UpdateUserModal