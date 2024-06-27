import { Button, Input } from 'antd';
import { useState } from 'react';


const UserForm = () => {

    const [fullName, setFullName] = useState("") 
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("") 
    const [phoneNumber, setPhoneNumber] = useState("") 

    // console.log("check form: ", fullName, email, password, phoneNumber);
    const handleClickBtn = () => {
        console.log("check state: ", {fullName, email, password, phoneNumber});
    }

    return (
        <div className="user-form" style={{margin: '20px 0'}}>
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div>
                    <span>Full name</span>
                    <Input 
                        value={fullName} 
                        onChange={(e) => {setFullName(e.target.value)}} />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}} />                   
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value)}} /> 
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phoneNumber} 
                        onChange={(e) => {setPhoneNumber(e.target.value)}} />
                </div>
                <div>
                    <Button 
                        type='primary' 
                        // onClick={handleClickBtn}     // nếu không truyền tham số 
                        onClick={() => {handleClickBtn()}}>Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm