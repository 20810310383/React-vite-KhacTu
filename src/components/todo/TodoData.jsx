
const TodoData = (props) => {

    console.log("check props: ", props);
    const {name, age, data, todoList} = props
    return (
        <>
            <div className='bodyTodoList'>
                <div>My name is {data.address}</div>
                <div>Learning React</div>
                <div>
                    {JSON.stringify(todoList)}
                </div>
            </div>
        </>
    )
}

export default TodoData