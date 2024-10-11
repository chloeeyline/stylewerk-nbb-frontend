import Frontend from "#/routes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    requestPasswordReset,
    resetPassword,
    validatePassword,
} from "~/redux/features/user/user-api";
import cls from "~/utils/class-name-helper";
import InputField from "./InputField";
import styles from "./form-fields.module.scss";

function RequestReset() {
    const { t } = useTranslation();

    const emailRef = useRef<HTMLInputElement>(null);

    const [request, setRequest] = useState<{
        submitting: boolean;
        done: boolean;
        error: string | null;
    }>({
        submitting: false,
        done: false,
        error: null,
    });

    if (request.done === true) {
        return <div>{t("formMessages.requestPasswordReset")}</div>;
    }

    const submitResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (request.submitting === true) {
            return;
        }

        setRequest({ ...request, submitting: true, error: null });

        const email = (emailRef.current?.value ?? "").trim();

        if (email.length <= 0) {
            setRequest({
                ...request,
                submitting: false,
                error: t("formErrors.pleaseEnter", { what: t("formFields.email") }),
            });
            return;
        }

        const requestResetResult = await requestPasswordReset(email);

        if (requestResetResult.ok === false) {
            setRequest({
                ...request,
                submitting: false,
                error: t(`errorCodes.${requestResetResult.error.message}`),
            });
            return;
        }

        setRequest({
            ...request,
            submitting: false,
            error: null,
            done: true,
        });
    };

    return (
        <form
            className={cls(
                styles.form,
                styles.spinner,
                request.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitResetRequest}>
            <fieldset className={styles.fieldset}>
                <legend>{t("formNames.requestPasswordReset")}</legend>

                {request.error !== null ? (
                    <span className={styles.error}>{request.error}</span>
                ) : null}

                <InputField label={t("formFields.email")} name="email" required ref={emailRef} />
            </fieldset>

            <button type="submit">{t("formSubmit.requestPasswordReset")}</button>
        </form>
    );
}

function ResetPassword({ token }: { token: string }) {
    const { t } = useTranslation();

    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);

    const [reset, setReset] = useState<{
        submitting: boolean;
        done: boolean;
        error: string | null;
    }>({
        submitting: false,
        done: false,
        error: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (reset.done === true) {
            navigate(Frontend.Login);
        }
    }, [reset.done]);

    const submitReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reset.submitting === true) {
            return;
        }

        setReset({ ...reset, submitting: true, error: null });

        const password = (passwordRef.current?.value ?? "").trim();
        const repeatPassword = (repeatPasswordRef.current?.value ?? "").trim();

        if (password.length <= 0) {
            setReset({
                ...reset,
                submitting: false,
                error: t("formErrors.pleaseEnter", { what: t("formFields.password") }),
            });
            return;
        } else {
            const passwordResult = await validatePassword(password);

            if (passwordResult.ok === false) {
                setReset({
                    ...reset,
                    submitting: false,
                    error: t(`errorCodes.${passwordResult.error.message}`),
                });
                return;
            }
        }

        if (password !== repeatPassword) {
            setReset({
                ...reset,
                submitting: false,
                error: t("formErrors.passwordsNoMatch"),
            });
            return;
        }

        const resetPasswordResult = await resetPassword(token, password);

        if (resetPasswordResult.ok === false) {
            setReset({
                ...reset,
                submitting: false,
                error: t(`errorCodes.${resetPasswordResult.error.message}`),
            });
            return;
        }

        setReset({
            ...reset,
            submitting: false,
            error: null,
            done: true,
        });
    };

    return (
        <form
            className={cls(
                styles.form,
                styles.spinner,
                reset.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitReset}>
            <fieldset className={styles.fieldset}>
                <legend>{t("formNames.passwordReset")}</legend>

                {reset.error !== null ? <span className={styles.error}>{reset.error}</span> : null}

                <InputField
                    type="password"
                    label={t("formFields.password")}
                    name="password"
                    required
                    ref={passwordRef}
                />

                <InputField
                    type="password"
                    label={t("formFields.repeatPassword")}
                    name="repeatPassword"
                    required
                    ref={repeatPasswordRef}
                />
            </fieldset>

            <button type="submit">{t("formSubmit.passwordReset")}</button>
        </form>
    );
}

export default function ResetPasswordForm() {
    const token = new URLSearchParams(document.location.search).get("id");

    if (token !== null) {
        return <ResetPassword token={token} />;
    }

    return <RequestReset />;
}
