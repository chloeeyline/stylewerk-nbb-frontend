import type React from "react";
import { selectUser } from "~/redux/features/user/user-slice";
import { useAppSelector } from "~/redux/hooks";
import LoginForm from "../forms/LoginForm";

export default function UserGuard({ children }: React.PropsWithChildren) {
    const { status } = useAppSelector(selectUser);

    if (status === "loggedIn" || status === "failed") {
        return children;
    }

    return <LoginForm onLogin={() => {}} />;
}
