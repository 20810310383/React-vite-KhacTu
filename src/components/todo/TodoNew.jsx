
const TodoNew = (props) => {
    console.log("check props: ", props);
    const {addNewTodo} = props

    return (
        <>
            <input className='inpTxt' placeholder='Enter your task' type="text" />
            <button className='btnAdd' >Add</button>
        </>
    )
}

export default TodoNew