import type React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    register,
    validateEmail,
    validatePassword,
    validateUsername,
} from "~/redux/features/user/user-api";
import { genders } from "~/redux/features/user/user-schemas";
import cls from "~/utils/class-name-helper";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";
import SelectField from "./SelectField";

type FormErrors = {
    username: string | null;
    email: string | null;
    password: string | null;
    repeatPassword: string | null;
    firstName: string | null;
    lastName: string | null;
    gender: string | null;
    birthday: string | null;
};

const initialFormErrors = {
    username: null,
    email: null,
    password: null,
    repeatPassword: null,
    firstName: null,
    lastName: null,
    gender: null,
    birthday: null,
};

export default function RegistrationForm() {
    const { t } = useTranslation();

    const [registration, setRegistration] = useState<{
        submitting: boolean;
        done: boolean;
        error: string | null;
    }>({
        submitting: false,
        done: false,
        error: null,
    });

    const [formError, setFormError] = useState<FormErrors>({ ...initialFormErrors });

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const birthdayRef = useRef<HTMLInputElement>(null);

    if (registration.done) {
        return (
            <div>
                <p>
                    Registration complete! Please verify your email using the link sent to you to
                    activate login for your account.
                </p>
            </div>
        );
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (registration.submitting === true) {
            return;
        }

        setRegistration({ ...registration, submitting: true, error: null });

        const username = (usernameRef.current?.value ?? "").trim();
        const email = (emailRef.current?.value ?? "").trim();
        const password = (passwordRef.current?.value ?? "").trim();
        const repeatPassword = (repeatPasswordRef.current?.value ?? "").trim();
        const firstName = (firstNameRef.current?.value ?? "").trim();
        const lastName = (lastNameRef.current?.value ?? "").trim();
        const gender = (genderRef.current?.value ?? "").trim();
        const birthday = (birthdayRef.current?.value ?? "").trim();

        const errors: FormErrors = { ...initialFormErrors };
        let errorCount = 0;

        if (username.length <= 0) {
            errors.username = t("formErrors.pleaseEnter", { what: t("formFields.username") });
            errorCount++;
        } else {
            const usernameResult = await validateUsername(username);

            if (usernameResult.ok === false) {
                errors.username = t(`errorCodes.${usernameResult.error.message}`);
                errorCount++;
            }
        }

        if (email.length <= 0) {
            errors.email = t("formErrors.pleaseEnter", { what: t("formFields.email") });
            errorCount++;
        } else {
            const emailResult = await validateEmail(email);

            if (emailResult.ok === false) {
                errors.email = t(`errorCodes.${emailResult.error.message}`);
                errorCount++;
            }
        }

        if (password.length <= 0) {
            errors.password = t("formErrors.pleaseEnter", { what: t("formFields.password") });
            errorCount++;
        } else {
            const passwordResult = await validatePassword(password);

            if (passwordResult.ok === false) {
                errors.password = t(`errorCodes.${passwordResult.error.message}`);
                errorCount++;
            }
        }

        if (password !== repeatPassword) {
            errors.repeatPassword = t("formErrors.passwordsNoMatch");
            errorCount++;
        }

        if (firstName.length <= 0) {
            errors.firstName = t("formErrors.pleaseEnter", { what: t("formFields.firstName") });
            errorCount++;
        }

        if (lastName.length <= 0) {
            errors.lastName = t("formErrors.pleaseEnter", { what: t("formFields.lastName") });
            errorCount++;
        }

        if (genders.includes(gender) === false) {
            errors.gender = t("formErrors.pleaseSelect", { what: t("formFields.gender") });
            errorCount++;
        }

        if (birthday.length <= 0) {
            errors.birthday = t("formErrors.pleaseSelect", { what: t("formFields.birthday") });
            errorCount++;
        }

        if (errorCount !== 0) {
            setFormError({ ...errors });
            setRegistration({
                ...registration,
                submitting: false,
                error: t("formErrors.general"),
            });
            return;
        }

        const registrationResult = await register({
            username,
            email,
            password,
            firstName,
            lastName,
            gender,
            birthday: new Date(birthday).valueOf(),
        });

        if (registrationResult.ok === false) {
            setRegistration({
                ...registration,
                submitting: false,
                error: t(`errorCodes.${registrationResult.error}`),
            });
            return;
        }

        setRegistration({ submitting: false, done: true, error: null });
    };

    return (
        <form
            className={cls(
                "p-relative m-i-auto size-inline-100",
                styles.spinner,
                registration.submitting ? styles.submitting : undefined,
            )}
            onSubmit={submitForm}>
            <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                <legend className="bg-base-100 rounded-1 p-1 no-line-height">
                    {t("formNames.registration")}
                </legend>
                {registration.error !== null ? (
                    <span className="error">{registration.error}</span>
                ) : null}

                <div className={cls("d-grid gap-1", styles.twoCol)}>
                    <InputField
                        className="bg-base-300"
                        label={t("formFields.username")}
                        name="username"
                        required
                        ref={usernameRef}
                        error={formError.username}
                    />

                    <InputField
                        className="bg-base-300"
                        label={t("formFields.email")}
                        name="email"
                        required
                        ref={emailRef}
                        error={formError.email}
                    />
                </div>

                <div className={cls("d-grid gap-1", styles.twoCol)}>
                    <InputField
                        className="bg-base-300"
                        type="password"
                        label={t("formFields.password")}
                        name="password"
                        required
                        ref={passwordRef}
                        error={formError.password}
                    />

                    <InputField
                        className="bg-base-300"
                        type="password"
                        label={t("formFields.repeatPassword")}
                        name="repeatPassword"
                        required
                        ref={repeatPasswordRef}
                        error={formError.repeatPassword}
                    />
                </div>

                <div className={cls("d-grid gap-1", styles.twoCol)}>
                    <InputField
                        className="bg-base-300"
                        label={t("formFields.firstName")}
                        name="firstName"
                        required
                        ref={firstNameRef}
                        error={formError.firstName}
                    />

                    <InputField
                        className="bg-base-300"
                        label={t("formFields.lastName")}
                        name="lastName"
                        required
                        ref={lastNameRef}
                        error={formError.lastName}
                    />
                </div>

                <div className={cls("d-grid gap-1", styles.twoCol)}>
                    <SelectField
                        className="bg-base-300"
                        label={t("formFields.gender")}
                        name="gender"
                        required
                        ref={genderRef}
                        options={genders.map(
                            (gender) => [gender, t(`userGenders.${gender}`)] as [string, string],
                        )}
                        error={formError.gender}
                    />

                    <InputField
                        className="bg-base-300"
                        type="date"
                        label={t("formFields.birthday")}
                        name="birthday"
                        required
                        ref={birthdayRef}
                        error={formError.birthday}
                    />
                </div>

                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.registration")}
                </button>
            </fieldset>
        </form>
    );
}
