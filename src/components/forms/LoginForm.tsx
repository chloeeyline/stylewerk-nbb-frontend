import Frontend from "#/routes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "~/redux/features/user/user-api";
import { loginUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputField from "./InputField";
import styles from "./form-fields.module.scss";
import { useTranslation } from "react-i18next";
import cls from "~/utils/class-name-helper";

type FormErrors = {
    username: string | null;
    password: string | null;
};

export default function LoginForm() {
    const { t } = useTranslation();

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

        const passwordResult = await validatePassword(password);

        if (passwordResult.ok === false) {
            console.error(passwordResult);
            errors.password = passwordResult.error.message;
            errorCount++;
        }

        if (errorCount !== 0) {
            setFormError(errors);
            setLogin({
                ...login,
                submitting: false,
                error: t("formErrors.general"),
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
        <form
            className={cls(
                styles.form,
                styles.spinner,
                login.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitForm}>
            <fieldset className={styles.fieldset}>
                <legend>{t("nav.login")}</legend>

                {login.submitting ? <h2>{t("formStatus.login")}...</h2> : null}
                {login.error !== null ? <h2>{login.error}</h2> : null}
                {typeof user.error?.text === "string" ? <h2>{user.error.text}</h2> : null}

                <InputField
                    label={t("formFields.username")}
                    name="username"
                    required
                    ref={usernameRef}
                    error={formError.username}
                />

                <InputField
                    type="password"
                    label={t("formFields.password")}
                    name="password"
                    required
                    ref={passwordRef}
                    error={formError.password}
                />

                <InputField
                    type="checkbox"
                    label={t("formFields.rememberMe")}
                    name="rememberMe"
                    ref={rememberMeRef}
                />
            </fieldset>

            <button type="submit">{t("formSubmit.login")}</button>
        </form>
    );
}
