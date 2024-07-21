
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/api.service'
import  { useContext, useEffect } from 'react'
import { AuthContext } from './components/context/auth.context'
import { Spin } from 'antd';

// const Card = (props) => {
//   return (
//       <div style={{ border: '1px solid gray', borderRadius: '15px', padding: '20px', boxShadow: '2px 2px 12px rgba(0,0,0,0.1)' }}>
//           {props.children}
//       </div>
//   );
// };


const App = () => {

  const {setUser, isAppLoading, setIsAppLoading} = useContext(AuthContext);


  useEffect(() => {
    fetchUserInfo()
  }, [])

  const delay = (milSeconds) => {
    return new Promise((resolve, rejectt) => {
      setTimeout(() => {
        resolve()
      }, milSeconds)
    })
  }

  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    // await delay(3000)
    if(res.data){
      // success
      setUser(res.data.data.user)
      console.log(">> check user data: ", res.data);
    }
    setIsAppLoading(false)
  }

  const content = <div style={{
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  }} />;

  return (
    <>
        {/* <div style={{backgroundColor: "pink"}}>
            <Card>
                <h2>Title</h2>
                <p>This is the content inside the card.</p>
                <button>Action</button>
            </Card>
        </div> */}
        {isAppLoading === true ? 
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
            {/* <Spin size="large" /> */}
            <Spin tip="Loading..." size="large">
              {content}
            </Spin>
          </div> 
          :
          <>
            <Header />      
            <Outlet />
            <Footer />
          </>        
        }
        
        
    </>
    
  )
}

export default App
