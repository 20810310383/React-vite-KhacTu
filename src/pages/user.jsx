import UserForm from "../components/user/user.create"
import UserTable from "../components/user/user.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from "../services/api.service";


const UserPage = () => {

    const [dataUser, setDataUser] = useState([])

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)


    // empty arr => run one
    // not empty => value next !== vale prev
    useEffect(() => {
        loadUser()
    }, [current, pageSize])   // [] + condition

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        console.log("res: ", res);

        if(res.data){
            setDataUser(res.data.data.result)
            setCurrent(res.data.data.meta.current)
            setPageSize(res.data.data.meta.pageSize)
            setTotal(res.data.data.meta.total)

        }
    }

    console.log("check current: ", current);
    console.log("check pageSize: ", pageSize);
    
    return (
        <div style={{padding: "20px"}}>
            <UserForm loadUser={loadUser} />
            <UserTable  current={current}
                        pageSize={pageSize}
                        total={total}
                        dataUser={dataUser} 
                        loadUser={loadUser}  
                        setCurrent={setCurrent}
                        setPageSize={setPageSize}
            />
        </div>
    )
}

export default UserPage