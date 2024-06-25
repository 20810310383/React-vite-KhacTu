
const TodoData = (props) => {

    const {todoList} = props
    console.log("check props todoList: ", todoList);

    return (
        <>
            <div className='bodyTodoList'>
                {todoList.map((item, index) => {
                    console.log("index: ", index);
                    console.log("item: ", item);
                    return (
                        <div>
                            <div className="todo-item" key={item.id}>
                                <div>{item.name}</div>
                                <button className="btnDelete">Delete</button>
                            </div>
                            
                        </div>
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