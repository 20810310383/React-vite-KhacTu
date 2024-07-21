import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, message } from 'antd';
import React, { useContext, useState } from 'react';

import { HomeOutlined, AuditOutlined, UsergroupAddOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);
    console.log("check DATA: ", user);



    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = async (e) => {
      const res = await logoutAPI()
      console.log("res: ", res);

      if(res.data){
        // clear data
        localStorage.removeItem("access_token")
        setUser({
          email :  "",
          phone :  "",
          fullName :  "",
          role : "",
          avatar :  "",
          id :  "",
        })
        message.success("logout thành công")

        // back về home
        navigate("/")

      }
    };

    const items = [
        {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/user"}>Users</Link>,
          key: 'users',
          icon: <UsergroupAddOutlined />,
        //   disabled: true,
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'products',
          icon: <AuditOutlined />,          
        },

        ...(!user.id ? [{
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: 'login',
          icon: <LoginOutlined />, 
        }] : []),

        ...(user.id ? [{
          label: `Xin chào cậu ${user.fullName}`,
          key: 'setting',
          icon: <AliwangwangOutlined />,
          children: [
            {
              type: 'group',
              children: [                
                {
                  label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                  key: 'logout',
                },
              ],
            },
            
          ],
        }] : []),

        
        
    ];
    
      return (

          <Menu 
            onClick={onClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            items={items} />
      )
      

}

export default Header