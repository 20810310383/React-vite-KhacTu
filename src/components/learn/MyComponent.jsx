import './style.css'


// component = html + css + js
const MyComponent = () => {

    const str = [1, 2, 3]
    // const str = {
    //     name: "khắc tú",
    //     age: 22
    // }

    return (
      <>
        <div>{JSON.stringify(str)} học React</div>
        <div>{console.log("tú")}</div>
        <div className="child"
            style={
                {
                    color: "white",
                    fontSize: "30px"
                }
            }
        >child</div>
      </>
    )
}

export default MyComponent