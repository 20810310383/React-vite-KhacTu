import { Button, Checkbox, Col, Divider, Form, Input, Row, notification } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';


const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        console.log('Success:', values);
        // call api
       
    
        const res = await registerUserAPI(
            values.fullName, 
            values.email, 
            values.password, 
            values.phone
        )
    
        console.log("res: ", res);
    
        if(res.data) {
            notification.success({
                message: "register user",
                description: "đăng ký tài khoản thành công"
            })
            navigate('/login')
        } else {
            notification.error({
                message: "register user",
                description: JSON.stringify(res.message)
            })
        }
        
    };

    // Hàm để tạo mật khẩu ngẫu nhiên
    const generateRandomPassword = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    };

    return (
        <>
            <div style={{
                margin: "50px",
                display: "flex",
                flexDirection: "column"
            }}>            
                
                <Form    
                    form={form}   
                    layout='vertical'            
                    onFinish={onFinish}
                    style={{margin: "10px"}}
                    // onFinishFailed={onFinishFailed}
                >
                    <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3>
                    <Row justify="center">
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="FullName"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'vui lòng nhập FullName!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                    required: true,
                                    message: 'vui lòng nhập Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                    required: true,
                                    message: 'vui lòng nhập password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>                                                    

                    <Row justify="center">
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Số Điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        pattern: new RegExp(/\d+/g),
                                        message: "Bắt buộc nhập số"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>  


                    <Row justify="center">
                        <Col xs={24} md={8}>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                                >
                                <Button type="primary" onClick={() => form.submit()} style={{marginRight: "20px"}}>
                                    Submit
                                </Button>

                                <Button  onClick={() => {
                                    console.log("check form: ", form.getFieldsValue());
                                    // form.getFieldsValue()
                                    const randomPassword = generateRandomPassword(12); // Sinh mật khẩu với độ dài 12 ký tự
                                    form.setFieldsValue({
                                        password: randomPassword,
                                    })
                                }}>
                                    Random Password
                                </Button>
                            </Form.Item>
                        </Col>  
                    </Row>  
                </Form>
                <Divider />
                <div style={{ textAlign: "center" }}>
                    Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link>
                </div>
            </div>
        </>
    )
}

export default RegisterPage