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
import Grid from "../layout/Grid";

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
        return (
            <Grid layout="contentCenter" className="size-100">
                <p>{t("formMessages.requestPasswordReset")}</p>
            </Grid>
        );
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
                "p-relative m-i-auto size-inline-100",
                styles.spinner,
                request.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitResetRequest}>
            <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                <legend className="bg-base-100 rounded-1 p-1 no-line-height">
                    {t("formNames.requestPasswordReset")}
                </legend>

                {request.error !== null ? <span className="error">{request.error}</span> : null}

                <InputField
                    className="bg-base-300"
                    label={t("formFields.email")}
                    autoComplete="email"
                    name="email"
                    required
                    ref={emailRef}
                />

                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.requestPasswordReset")}
                </button>
            </fieldset>
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
                "p-relative m-i-auto size-inline-100",
                styles.spinner,
                reset.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitReset}>
            <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                <legend className="bg-base-100 rounded-1 p-1 no-line-height">
                    {t("formNames.passwordReset")}
                </legend>

                {reset.error !== null ? <span className="error">{reset.error}</span> : null}

                <InputField
                    className="bg-base-300"
                    type="password"
                    label={t("formFields.password")}
                    name="password"
                    autoComplete="new-password"
                    required
                    ref={passwordRef}
                />

                <InputField
                    className="bg-base-300"
                    type="password"
                    label={t("formFields.repeatPassword")}
                    name="repeatPassword"
                    autoComplete="new-password"
                    required
                    ref={repeatPasswordRef}
                />

                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.passwordReset")}
                </button>
            </fieldset>
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
