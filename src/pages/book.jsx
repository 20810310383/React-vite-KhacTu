import { useCallback, useEffect, useState } from "react"
import { BookTable } from "../components/book/book.table"
import { fetchAllBookAPI } from "../services/api.book"
import { BookCreate } from "../components/book/book.create"

const BookPage = () => {

    const [dataBook, setDataBook] = useState([])

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [total, setTotal] = useState(0)

    const [loadingTable, setLoadingTable] = useState(false)
    

    const loadBook = useCallback( async () => {
        setLoadingTable(true)
        const res = await fetchAllBookAPI(current, pageSize)
        console.log("res book: ", res);

        if(res.data){
            setDataBook(res.data.data.result)
            setCurrent(res.data.data.meta.current)
            setPageSize(res.data.data.meta.pageSize)
            setTotal(res.data.data.meta.total)
        }
        setLoadingTable(false)
    },[current, pageSize])

    useEffect(() => {
        loadBook()
    }, [loadBook])
 
    return (
        <div style={{padding: "30px"}}>
            <BookCreate 
                loadBook={loadBook}
            />
            <BookTable 
                loadBook={loadBook}
                dataBook={dataBook}
                setDataBook={setDataBook}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                setTotal={setTotal}
                loadingTable={loadingTable}
                setLoadingTable={setLoadingTable}
            />
        </div>
    )
}

export default BookPage