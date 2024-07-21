import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Result } from "antd";


const PrivateRoute = (props) => {

    const {user} = useContext(AuthContext);

    if(user && user.id){
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            // <Navigate to="/login" replace />
            <Result
                status="404"
                title="Lỗi cụ rồi"
                subTitle={"Bạn cần login để truy cập"}
                extra={<Button type="primary">
                    <Link to="/">back to home page</Link>
                </Button>}
            />
        )
    }

    return (
        <>
        
        
        </>
    )
}

export default PrivateRoute