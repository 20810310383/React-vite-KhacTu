import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Image, Input, InputNumber, Modal, Row, Select, Upload, notification } from "antd"
import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/api.book";
import { handleUploadFile } from "../../services/api.service";


export const BookUpdate = (props) => {

    const {loadBook, isModalUpdate, setIsModalUpdate, dataUpdate, setDataUpdate} = props
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [fileList, setFileList] = useState([
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-xxx',
        //   percent: 50,
        //   name: 'image.png',
        //   status: 'uploading',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-5',
        //   name: 'image.png',
        //   status: 'error',
        // },
    ]);


    useEffect(() => {
        console.log(">> check data update props: ", dataUpdate);
        if(dataUpdate && dataUpdate._id){
            
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })
            setPreviewImage(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])    

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        );

        console.log("resBook Update: ", resBook);

        if (resBook.data) {
            handleCancel()
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Cập nhật book thành công"
            })

        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            })
        }
    }

    const handleUpdate = async (values) => {

        //không có ảnh previewImage + không có file => return
        if (!selectedFile && !previewImage) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        let newThumbnail = "";
        //có ảnh previewImage và không có file => không upload file
        if (!selectedFile && previewImage) {
            //do nothing
            newThumbnail = dataUpdate.thumbnail;
        } else {
            //có ảnh previewImage và có file => upload file
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.data.fileUploaded;
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }

        //step 2: update book
        await updateBook(newThumbnail, values);
    }
    

    const handleCancel = () => {
        form.resetFields();
        setIsModalUpdate(false)
        setDataUpdate(null)
        setSelectedFile(null);
        setPreviewImage(null)

    }

    const formatNumber = (value) => {
        if (!value) {
            return '';
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const parseNumber = (value) => {
        return value.replace(/\.\s?|(\.*)/g, '');
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreviewImage(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <>                   
            <Modal 
                title="Chỉnh sửa book" 
                open={isModalUpdate} 
                onOk={() => form.submit()} 
                onCancel={handleCancel}
                maskClosable={false}
                okText={"Xác nhận chỉnh sửa"}
            >
                <Row gutter={16}>
                        <Col xs={24} >                
                            <Form
                                form={form}
                                onFinish={handleUpdate}
                                layout="vertical"
                            >   

                                <Form.Item 
                                    label="Mã sản phẩm"
                                    name="id"                                    
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item 
                                    label="Tiêu đề"
                                    name="mainText"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được bỏ trống, Bạn hãy nhập đầy đủ!',
                                        },                                
                                    ]}
                                >
                                    <Input placeholder="Nhập tiêu đề ..." />
                                </Form.Item>

                                <Form.Item 
                                    label="Tác giả"
                                    name="author"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được bỏ trống, Bạn hãy nhập đầy đủ!',
                                        },                                
                                    ]}
                                >
                                    <Input placeholder="Nhập tác giả ..." />
                                </Form.Item>

                                <Form.Item 
                                    label="Giá tiền"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được bỏ trống, Bạn hãy nhập đầy đủ!',
                                        },                                
                                    ]}
                                >
                                    <InputNumber    
                                        style={{ width: '100%' }} 
                                        addonAfter="đ"  
                                        placeholder="Nhập giá tiền ..."
                                        formatter={formatNumber}
                                        parser={parseNumber}                                    
                                    />
                                </Form.Item>

                                <Form.Item 
                                    label="Số lượng"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được bỏ trống, Bạn hãy nhập đầy đủ!',
                                        },                                
                                    ]}
                                >
                                    <InputNumber 
                                        formatter={formatNumber}
                                        parser={parseNumber}
                                        style={{ width: '100%' }}                                          
                                        placeholder="Nhập số lượng ..."/>
                                </Form.Item>

                                <Form.Item 
                                    label="Thể loại"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được bỏ trống, Bạn hãy nhập đầy đủ!',
                                        },                                
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        name="category"
                                        placeholder="Chọn thể loại"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: 'Arts', label: 'Arts' },
                                            { value: 'Business', label: 'Business' },
                                            { value: 'Comics', label: 'Comics' },
                                            { value: 'Cooking', label: 'Cooking' },
                                            { value: 'Entertainment', label: 'Entertainment' },
                                            { value: 'History', label: 'History' },
                                            { value: 'Music', label: 'Music' },
                                            { value: 'Sports', label: 'Sports' },
                                            { value: 'Teen', label: 'Teen' },
                                            { value: 'Travel', label: 'Travel' },
                                        ]}
                                    />
                                </Form.Item>

                                
                                <div>
                                    <div>Ảnh thumbnail</div>
                                    <div>
                                        <label htmlFor='btnUpload' style={{
                                            display: "block",
                                            width: "fit-content",
                                            marginTop: "15px",
                                            padding: "5px 10px",
                                            background: "orange",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}>
                                            Upload
                                        </label>
                                        <input
                                            type='file' hidden id='btnUpload'
                                            onChange={(event) => handleOnChangeFile(event)}
                                            onClick={(event) => event.target.value = null}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {previewImage &&
                                        <>
                                            <div style={{
                                                marginTop: "10px",
                                                marginBottom: "15px",
                                                height: "100px", width: "150px",
                                            }}>
                                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                                    src={previewImage} />
                                            </div>
                                        </>
                                    }
                                </div>

                            </Form>
                        </Col>
                    </Row>
            </Modal>
        </>
    )
}