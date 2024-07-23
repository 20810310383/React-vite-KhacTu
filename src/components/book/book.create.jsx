import { AppstoreAddOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, notification } from "antd"
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { handleUploadFile } from "../../services/api.service";
import { createBookAPI } from "../../services/api.book";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const BookCreate = (props) => {

    const {loadBook} = props
    const [size, setSize] = useState('large'); // default is 'middle'
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {        
        form.resetFields();
        setSelectedFile(null);
        setPreviewImage(null);
        setIsModalOpen(false)
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
    
    const handleSubmitBtn = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        try {
            //step 1: upload file
            const resUpload = await handleUploadFile(selectedFile, "book");
            console.log("resUpload: ", resUpload);
            if (resUpload.data) {
                //success
                const newThumbnail = resUpload.data.data.fileUploaded;
                //step 2: create book
                const { mainText, author, price, quantity, category } = values;

                console.log("{ mainText, author, price, quantity, category, newThumbnail }: ", mainText, author, price, quantity, category, newThumbnail);
                
                const resBook = await createBookAPI(
                    newThumbnail, mainText, author, price, quantity, category
                );

                console.log("resBook: ", resBook);

                if (resBook.data) {
                    handleCancel()
                    await loadBook();
                    notification.success({
                        message: "Create book",
                        description: "Tạo mới book thành công"
                    })

                } else {
                    notification.error({
                        message: "Error create book",
                        description: JSON.stringify(resBook.message)
                    })
                }
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.toString()
            });
        }
    }

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


    const handleChange = async ({ fileList: newFileList, file }) => {
        setFileList(newFileList);
    
        if (file.status === 'uploading') {
          return;
        }
    
        if (file.status === 'done' || file.status === 'error') {
          setPreviewImage(null);
          const previewFile = file.originFileObj || file;
          const preview = await getBase64(previewFile);
          setPreviewImage(preview);
          setPreviewOpen(true);
        }

        if (file && file.originFileObj) {
            setSelectedFile(file.originFileObj);
            setPreviewImage(URL.createObjectURL(file.originFileObj));
        }
    };
    
    
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    
    
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "20px"
            }}>
                <Button type="primary" icon={<AppstoreAddOutlined />} size={size} onClick={showModal}>
                        Thêm mới Books
                </Button>
                                 
                <Modal  title="Create Book (uncontrolled component)" 
                        open={isModalOpen} 
                        onOk={() => form.submit()} 
                        maskClosable={false}    // click ra ngoài không đóng modal, bắt buộc user phải ấn vào nút
                        onCancel={handleCancel}
                        okText={"Xác nhận tạo mới"}
                >
                    <Row gutter={16}>
                        <Col xs={24} >                
                            <Form
                                form={form}
                                onFinish={handleSubmitBtn}
                                layout="vertical"
                            >   

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
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-circle"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    {previewImage && (
                                        <Image
                                        wrapperStyle={{
                                            display: 'none',
                                        }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                        />
                                    )}
                                </div> 
                                {/* <div>
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
                                </div> */}

                            </Form>
                        </Col>
                    </Row>
                </Modal>
            </div>        
        </>
    )
}