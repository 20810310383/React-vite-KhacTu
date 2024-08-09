import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, message } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { HomeOutlined, AuditOutlined, UsergroupAddOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const location = useLocation()

    const {user, setUser} = useContext(AuthContext);
    
    console.log("check DATA: ", user);

    useEffect(() => {
      console.log("check location: ", location);
      if (location && location.pathname) {
          const allRoutes = ["user", "books"];
          const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
          console.log("currentRoute: ", currentRoute);
          if (currentRoute) {
              setCurrent(currentRoute);
          } else {
              setCurrent("home");
          }
      }
    }, [location])





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
          key: 'user',
          icon: <UsergroupAddOutlined />,
        //   disabled: true,
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'books',
          icon: <AuditOutlined />,          
        },

        ...(!user.id ? [{
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: 'login',
          icon: <LoginOutlined />, 
        }] : []),

        ...(user.id ? [{
          label: `Xin chào ${user.fullName}`,
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