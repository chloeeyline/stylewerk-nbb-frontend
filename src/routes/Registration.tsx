import { useRef, useState } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { User } from "~/redux/features/user/user-class";
import { loginUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function Registration() {
    const user = useAppSelector(selectUser);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const [usernameError, setUsernameError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    switch (user.status) {
        case "loggedIn":
            return <div>{user.username} - Logged in</div>;
        case "loggingIn":
            return <div>Logging in...</div>;
        case "failed":
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

        const [usernameResult, passwordResult] = await Promise.all([
            User.validateUsername(username),
            User.validatePassword(password),
        ]);

        if (usernameResult.ok === false) {
            setUsernameError(usernameResult.error.message);
        }

        if (passwordResult.ok === false) {
            setPasswordError(passwordResult.error.message);
        }

        if (usernameResult.ok === false || passwordResult.ok === false) {
            return;
        }

        dispatch(loginUser({ username, password, consistOverSession }));
    };

    return (
        <Grid layout="header">
            <h1>Registration</h1>
            <ScrollContainer direction="vertical">
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
                        <input
                            ref={rememberMeRef}
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                        />
                    </fieldset>
                    <button type="submit">Submit</button>
                </form>
            </ScrollContainer>
        </Grid>
    );
}
