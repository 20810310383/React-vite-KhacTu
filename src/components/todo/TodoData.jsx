
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
                            <div className="todo-item">
                                <div>{item.name}</div>
                                <button>Delete</button>
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