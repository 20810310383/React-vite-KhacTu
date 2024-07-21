import { Button, Drawer, notification } from "antd"
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";


const ViewUserModal = (props) => {

    const {isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser} = props  

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        const file = e.target.files[0]
        if(file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
        
        // I've kept this example simple by using the first image instead of multiple
        // setSelectedFile(e.target.files[0])
    }

    const handleUpdateUserAvatar = async () => {
        // upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        console.log(">> resUpload: ", resUpload);
        if(resUpload.data){
            // success
            const newAvatar = resUpload.data.data.fileUploaded
            console.log(">>> new: ", newAvatar);

            // update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if(resUpdateAvatar.data){
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()

                notification.success({
                    message: " update user avatar",
                    description: "cập nhật avatar thành công"
                }) 
            } else {
                notification.error({
                    message: "error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })            
            }

        } else {
            notification.error({
                message: "error upload file",
                description: JSON.stringify(resUpload.message)
            })            
        }
    }

    console.log("preview: ", preview);

    return (
        <Drawer title="Chi tiết User"
            width={"40vw"}
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
                <div>
                    <img height={100} width={100} 
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                </div>
                {/* <Button type="primary">Upload Avatar</Button> */}
                <div>
                    <label htmlFor="btnUpload" style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        padding: "5px 10px",
                        background: "blue",
                        color: "white",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>Upload Avatar</label>
                    <input type="file" 
                            hidden name="" 
                            id="btnUpload" 
                            // onChange={handleOnChangeFile} 
                            onChange={(e) => handleOnChangeFile(e)}
                            
                    />
                </div>

                {preview && 
                    <>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px", width: "150px"
                        }}>
                            <img height={100} width={100} 
                            src={preview} alt="" />
                        </div>
                        <Button type="primary" onClick={handleUpdateUserAvatar}>Save</Button>
                    </>

                }
                
                
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