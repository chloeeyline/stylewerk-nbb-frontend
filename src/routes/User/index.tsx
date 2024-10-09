import { useTranslation } from "react-i18next";
import { logoutUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function User() {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    if (user.status === "loggingOut") {
        return (
            <div>
                <h1>User - {user.username} - Logging out...</h1>
            </div>
        );
    }

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
                {t("common.user", { count: 1 })}: {username}
                {admin === true ? " - is admin" : ""}
            </h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum veniam ipsa
                provident debitis doloremque repellat rerum labore illum aliquid earum dolores esse
                harum doloribus inventore dolorem assumenda aliquam, magni perferendis.
            </p>
            <button onClick={() => dispatch(logoutUser())}>{t("common.logout")}</button>
        </div>
    );
}
