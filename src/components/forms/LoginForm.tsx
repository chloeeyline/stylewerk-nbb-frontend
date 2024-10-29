import Frontend from "#/routes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "~/redux/features/user/user-api";
import { loginUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";

type FormErrors = {
    username: string | null;
    password: string | null;
};

export default function LoginForm({ onLogin }: { onLogin?: () => void }) {
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
        if (user.status !== "loggedIn") return;
        if (typeof onLogin === "function") {
            onLogin();
            return;
        }

        navigate(Frontend.Entries.List);
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
            error: null,
        });
    };

    return (
        <form
            className={cls(
                "p-relative m-i-auto size-inline-100",
                styles.spinner,
                login.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitForm}>
            <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                <legend className="bg-base-100 rounded-1 p-1 no-line-height">
                    {t("formNames.login")}
                </legend>

                {login.error !== null ? <span className="error">{login.error}</span> : null}
                {typeof user.error?.text === "string" ? (
                    <span className="error">{t(`errorCodes.${user.error.text}`)}</span>
                ) : null}

                <InputField
                    className="bg-base-300"
                    label={t("formFields.username")}
                    name="username"
                    autoComplete="username"
                    required
                    ref={usernameRef}
                    error={formError.username}
                />

                <InputField
                    className="bg-base-300"
                    type="password"
                    label={t("formFields.password")}
                    name="password"
                    autoComplete="current-password"
                    required
                    ref={passwordRef}
                    error={formError.password}
                />

                <div className="m-bs-0">
                    <InputField
                        type="checkbox"
                        label={t("formFields.rememberMe")}
                        name="rememberMe"
                        ref={rememberMeRef}
                    />
                </div>

                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.login")}
                </button>
            </fieldset>
        </form>
    );
}
