import type React from "react";
import { selectUser } from "~/redux/features/user/user-slice";
import { useAppSelector } from "~/redux/hooks";
import LoginForm from "../forms/LoginForm";
import Loader from "../layout/Loader";

export default function UserGuard({ children }: React.PropsWithChildren) {
    const { status } = useAppSelector(selectUser);

    if (status === "loggingIn" || status === "refresh") {
        return <Loader />;
    }

    if (status === "loggedIn" || status === "failed") {
        return children;
    }

    return <LoginForm onLogin={() => {}} />;
}
