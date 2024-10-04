import Frontend from "#/routes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "~/redux/features/user/user-class";
import { loginUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

type FormErrors = {
    username: string | null;
    password: string | null;
};

export default function LoginForm() {
    const user = useAppSelector(selectUser);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);

    const [formError, setFormError] = useState<FormErrors>({ username: null, password: null });

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (user.status === "loggedIn") {
            navigate(Frontend.User.Index);
        }
    }, [user.status]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const consistOverSession = rememberMeRef.current?.checked ?? false;

        const usernameFailed = typeof username !== "string" || username.length <= 0;
        const passwordFailed = typeof password !== "string" || password.length <= 0;

        const error: FormErrors = {
            username: null,
            password: null,
        };

        if (usernameFailed) {
            error.username = "Please enter a username!";
        }

        if (passwordFailed) {
            error.password = "Please enter a password!";
        }

        if (usernameFailed || passwordFailed) {
            setFormError(error);
            return;
        }

        const passwordResult = await User.validatePassword(password);

        if (passwordResult.ok === false) {
            setFormError({ username: null, password: passwordResult.error.message });
            return;
        }

        dispatch(loginUser({ username, password, consistOverSession }));
    };

    return (
        <form onSubmit={submitForm}>
            {user.status === "loggingIn" ? <h2>Logging in...</h2> : null}
            {user.status === "failed" ? <h2>Error logging in...</h2> : null}
            <fieldset>
                <legend>Username</legend>
                <input ref={usernameRef} type="text" name="username" id="username" />
                {formError.username !== null ? <div>{formError.username}</div> : null}
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <input ref={passwordRef} type="password" name="password" id="password" />
                {formError.password !== null ? <div>{formError.password}</div> : null}
            </fieldset>
            <fieldset>
                <legend>Remember me</legend>
                <input ref={rememberMeRef} type="checkbox" name="rememberMe" id="rememberMe" />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    );
}
