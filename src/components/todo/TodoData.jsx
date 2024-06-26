
const TodoData = (props) => {

    const {todoList, deleteTodo} = props
    console.log("check props todoList: ", todoList);

    const handleClick = (id) => {
        // alert(`id cần xoá ${id}`)
        deleteTodo(id)
    }

    return (
        <>
            <div className='bodyTodoList'>
                {todoList.map((item, index) => {
                    console.log("index: ", index);
                    console.log("item: ", item);
                    return (
                        <>
                            <div className="todo-item" key={item.id}>
                                <div>{item.name}</div>
                                <button className="btnDelete" onClick={() => handleClick(item.id)}>Delete</button>
                                {/* <button className="btnEdit">Edit</button> */}
                            </div>                            
                        </>
                    )
                })}
                {/* 
                <div>
                    {JSON.stringify(todoList)}
                </div> */}
            </div>
        </>
    )
}

export default TodoData