import type React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateEmail, validateEmail, verifyUpdateEmail } from "~/redux/features/user/user-api";
import { getUserData } from "~/redux/features/user/user-slice";
import { useAppDispatch } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";

export default function UpdateEmailForm({ email }: { email: string }) {
    const { t } = useTranslation();

    const emailRef = useRef<HTMLInputElement>(null);
    const tokenRef = useRef<HTMLInputElement>(null);

    const [state, setState] = useState<{
        submitting: boolean;
        error: string | null;
        askForCode: boolean;
    }>({
        submitting: false,
        error: null,
        askForCode: false,
    });

    const dispatch = useAppDispatch();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state.submitting) {
            return;
        }

        setState({
            ...state,
            submitting: true,
        });

        if (state.askForCode === true) {
            const token = tokenRef.current?.value ?? "";

            const verification = await verifyUpdateEmail(token);

            if (verification.ok !== true) {
                setState({
                    ...state,
                    error: t(`errorCodes.${verification.error.message}`),
                    submitting: false,
                });
                return;
            }

            setState({
                ...state,
                error: null,
                submitting: false,
                askForCode: false,
            });

            dispatch(getUserData());
            return;
        }

        const email = emailRef.current?.value ?? "";

        if (email.length <= 0) {
            setState({
                ...state,
                error: t("formErrors.pleaseEnter", { what: t("formFields.email") }),
                submitting: false,
            });
            return;
        } else {
            const emailResult = await validateEmail(email);

            if (emailResult.ok === false) {
                setState({
                    ...state,
                    error: t(`errorCodes.${emailResult.error.message}`),
                    submitting: false,
                });
                return;
            }
        }

        const update = await updateEmail(email);

        if (update.ok !== true) {
            setState({
                ...state,
                error: update.error.message,
                submitting: false,
                askForCode: false,
            });
            return;
        }

        setState({
            ...state,
            error: null,
            submitting: false,
            askForCode: true,
        });
    };

    return (
        <form
            className={cls(
                "p-relative m-i-auto size-inline-100",
                styles.spinner,
                state.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitForm}>
            <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                <legend className="bg-base-100 rounded-1 p-1 no-line-height">
                    {t("formNames.updateEmail")}
                </legend>
                {state.error !== null ? <span className="error">{state.error}</span> : null}

                <InputField
                    className="rounded-1 bg-base-300 no-border p-1"
                    label={t("formFields.email")}
                    name="email"
                    autoComplete="email"
                    required
                    defaultValue={email}
                    ref={emailRef}
                    error={state.error}
                />

                {state.askForCode === true ? (
                    <InputField label="Token" name="token" ref={tokenRef} />
                ) : null}
                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.updateEmail")}
                </button>
            </fieldset>
        </form>
    );
}
