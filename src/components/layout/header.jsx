import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import React, { useState } from 'react';

import { HomeOutlined, AuditOutlined, UsergroupAddOutlined } from '@ant-design/icons';


const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
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