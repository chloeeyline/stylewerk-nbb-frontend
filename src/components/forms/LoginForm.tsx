import Frontend from "#/routes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "~/redux/features/user/user-class";
import { loginUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputField from "./InputField";
import styles from "./form-fields.module.scss";

type FormErrors = {
    username: string | null;
    password: string | null;
};

export default function LoginForm() {
    const user = useAppSelector(selectUser);

    const [login, setLogin] = useState<{
        submitting: boolean;
        error: string | null;
    }>({
        submitting: false,
        error: null,
    });

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

        if (login.submitting === true) {
            return;
        }

        setLogin({ ...login, submitting: true, error: null });

        const username = usernameRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const consistOverSession = rememberMeRef.current?.checked ?? false;

        const errors: FormErrors = {
            username: null,
            password: null,
        };
        let errorCount = 0;

        if (username.length <= 0) {
            errors.username = "Please enter a username!";
            errorCount++;
        }

        if (password.length <= 0) {
            errors.password = "Please enter a password!";
            errorCount++;
        } else {
            const passwordResult = await User.validatePassword(password);

            if (passwordResult.ok === false) {
                errors.password = passwordResult.error.message;
                errorCount++;
            }
        }

        if (errorCount !== 0) {
            setFormError(errors);
            setLogin({
                ...login,
                submitting: false,
                error: "Error validating form fields, please check!",
            });
            return;
        }

        dispatch(loginUser({ username, password, consistOverSession }));

        setLogin({
            ...login,
            submitting: false,
            error: null,
        });
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <fieldset className={styles.fieldset}>
                <legend>Login</legend>

                {login.submitting ? <h2>Logging in...</h2> : null}
                {login.error !== null ? <h2>{login.error}</h2> : null}
                {typeof user.error?.text === "string" ? <h2>{user.error.text}</h2> : null}

                <InputField
                    label="Username"
                    name="username"
                    required
                    ref={usernameRef}
                    error={formError.username}
                />

                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    required
                    ref={passwordRef}
                    error={formError.password}
                />

                <InputField
                    type="checkbox"
                    label="Remember me"
                    name="rememberMe"
                    ref={rememberMeRef}
                />
            </fieldset>

            <button type="submit">Submit</button>
        </form>
    );
}
