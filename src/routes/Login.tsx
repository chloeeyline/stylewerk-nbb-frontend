import { useRef } from "react";
import { loginUser, selectUser } from "~/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function Login() {
    const user = useAppSelector(selectUser);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    if (user.status === "loggingIn") {
        return <div>Logging in...</div>;
    }

    if (user.status === "loggedIn") {
        return <div>{user.username}</div>;
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const username = usernameRef.current?.value;
                const password = passwordRef.current?.value;
                const consistOverSession = rememberMeRef.current?.checked;

                if (
                    typeof username === "string" &&
                    typeof password === "string" &&
                    typeof consistOverSession === "boolean"
                ) {
                    dispatch(loginUser({ username, password, consistOverSession }));
                }
            }}>
            <fieldset>
                <legend>Username</legend>
                <input ref={usernameRef} type="text" name="username" id="username" />
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <input ref={passwordRef} type="password" name="password" id="password" />
            </fieldset>
            <fieldset>
                <legend>Remember me</legend>
                <input ref={rememberMeRef} type="checkbox" name="rememberMe" id="rememberMe" />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    );
}
