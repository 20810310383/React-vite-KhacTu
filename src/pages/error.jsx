import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Result
            status="404"
            title="Lỗi cụ rồi"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary">
                <Link to="/">back to home page</Link>
            </Button>}
        />
    )
}

export default ErrorPage