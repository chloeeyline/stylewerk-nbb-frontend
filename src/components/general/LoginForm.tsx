import type React from "react";
import { useRef, useState } from "react";
import { User } from "~/redux/features/user/userClass";
import { loginUser, selectUser } from "~/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function LoginForm({
    onLoggingIn,
    onLoggedIn,
    onFailed,
}: {
    onLoggingIn?: React.ReactNode;
    onLoggedIn?: React.ReactNode;
    onFailed?: React.ReactNode;
}) {
    const user = useAppSelector(selectUser);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const [usernameError, setUsernameError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    switch (user.status) {
        case "loggedIn":
            if (typeof onLoggedIn !== "undefined") {
                return onLoggedIn;
            }

            return <div>{user.username} - Logged in</div>;
        case "loggingIn":
            if (typeof onLoggingIn !== "undefined") {
                return onLoggingIn;
            }

            return <div>Logging in...</div>;
        case "failed":
            if (typeof onFailed !== "undefined") {
                return onFailed;
            }

            return <div>Failed logging in!</div>;
    }

    const submitForm = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const consistOverSession = rememberMeRef.current?.checked ?? false;

        const usernameFailed = typeof username !== "string" || username.length <= 0;
        const passwordFailed = typeof password !== "string" || password.length <= 0;

        if (usernameFailed) {
            setUsernameError("Please enter a username!");
        }

        if (passwordFailed) {
            setPasswordError("Please enter a password!");
        }

        if (usernameFailed || passwordFailed) {
            return;
        }

        const passwordResult = await User.validatePassword(password);

        if (passwordResult.ok === false) {
            setPasswordError(passwordResult.error.message);
        }

        if (passwordResult.ok === false) {
            return;
        }

        dispatch(loginUser({ username, password, consistOverSession }));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}>
            <fieldset>
                <legend>Username</legend>
                <input ref={usernameRef} type="text" name="username" id="username" />
                {usernameError !== null ? <div>{usernameError}</div> : null}
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <input ref={passwordRef} type="password" name="password" id="password" />
                {passwordError !== null ? <div>{passwordError}</div> : null}
            </fieldset>
            <fieldset>
                <legend>Remember me</legend>
                <input ref={rememberMeRef} type="checkbox" name="rememberMe" id="rememberMe" />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    );
}
