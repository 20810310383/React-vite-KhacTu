import './header.css'

const Header = () => {

    return (
        <>
            <ul>
                <li><a class="active" href="/">Home</a></li>
                <li><a href="/user">User</a></li>
                <li><a href="/products">Product</a></li>
            </ul>
        </>
    )
}

export default Header