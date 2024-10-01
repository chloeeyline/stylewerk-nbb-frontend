import { selectUser } from "~/redux/features/user/userSlice";
import { useAppSelector } from "~/redux/hooks";

export default function User() {
    const user = useAppSelector(selectUser);

    if (user.status === "guest") {
        return (
            <div>
                <h1>User - Guest</h1>
            </div>
        );
    }

    if (user.status === "loggingIn") {
        return (
            <div>
                <h1>User - Logging in...</h1>
            </div>
        );
    }

    if (user.status === "failed") {
        return (
            <div>
                <h1>User - Failure</h1>
            </div>
        );
    }

    const { username, admin } = user;

    return (
        <div>
            <h1>
                User - {username}
                {admin === true ? " - is admin" : ""}
            </h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum veniam ipsa
                provident debitis doloremque repellat rerum labore illum aliquid earum dolores esse
                harum doloribus inventore dolorem assumenda aliquam, magni perferendis.
            </p>
        </div>
    );
}
