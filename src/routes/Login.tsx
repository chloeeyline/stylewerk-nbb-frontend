import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "~/components/general/LoginForm";
import routes from "#/routes";

const LoggedIn = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(5);

    useEffect(() => {
        if (time <= 0) {
            navigate(routes.User.Index);
        }

        setTimeout(() => {
            setTime(time - 1);
        }, 1000);
    }, [time]);

    return (
        <div>
            <h3>Logged in! redirecting in {time}s</h3>
        </div>
    );
};

export default function Login() {
    return <LoginForm onLoggedIn={<LoggedIn />} />;
}
