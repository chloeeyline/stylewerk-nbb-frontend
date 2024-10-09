import type React from "react";
import { useRef, useState } from "react";
import { validateEmail, validatePassword, validateUsername, register } from "~/redux/features/user/user-api";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useTranslation } from "react-i18next";

const genders = ["NotSpecified", "Female", "Male", "NonBinary"] as const;

export type Genders = typeof genders;

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
                <button
                    type="button"
                    onClick={() => {
                        setFormError({ ...initialFormErrors });
                        setRegistration({
                            submitting: false,
                            done: false,
                            error: null,
                        });
                    }}>
                    Reset
                </button>
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
            errors.username = t("formErrors.pleaseEnter", { what: t("formFields.username")});
            errorCount++;
        } else {
            const usernameResult = await validateUsername(username);

            if (usernameResult.ok === false) {
                errors.username = usernameResult.error.message;
                errorCount++;
            }
        }

        if (email.length <= 0) {
            errors.email = t("formErrors.pleaseEnter", { what: t("formFields.email")});
            errorCount++;
        } else {
            const emailResult = await validateEmail(email);

            if (emailResult.ok === false) {
                errors.email = emailResult.error.message;
                errorCount++;
            }
        }

        if (password.length <= 0) {
            errors.password = "Please enter a password!";
            errorCount++;
        } else {
            const passwordResult = await validatePassword(password);

            if (passwordResult.ok === false) {
                errors.password = passwordResult.error.message;
                errorCount++;
            }
        }

        if (password !== repeatPassword) {
            errors.repeatPassword = t("formErrors.passwordsNoMatch");
            errorCount++;
        }

        if (firstName.length <= 0) {
            errors.firstName = "Please enter a first name!";
            errorCount++;
        }

        if (lastName.length <= 0) {
            errors.lastName = "Please enter a last name!";
            errorCount++;
        }

        if (genders.includes(gender) === false) {
            errors.gender = "Please select a valid gender!";
            errorCount++;
        }

        if (birthday.length <= 0) {
            errors.birthday = "Please select a valid birthday!";
            errorCount++;
        }

        if (errorCount !== 0) {
            setFormError({ ...errors });
            setRegistration({
                ...registration,
                submitting: false,
                error: "Error validating form fields, please check!",
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
                error: `Error registering: ${registrationResult.error}`,
            });
            return;
        }

        setRegistration({ submitting: false, done: true, error: null });
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <fieldset className={styles.fieldset}>
                <legend>Registration</legend>

                {registration.submitting === true ? <div>{t("formStatus.registration")}...</div> : null}
                {registration.error !== null ? <div>{registration.error}</div> : null}

                <InputField
                    label="Username"
                    name="username"
                    required
                    ref={usernameRef}
                    error={formError.username}
                />

                <InputField
                    label="Email"
                    name="email"
                    required
                    ref={emailRef}
                    error={formError.email}
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
                    type="password"
                    label="Repeat password"
                    name="repeatPassword"
                    required
                    ref={repeatPasswordRef}
                    error={formError.repeatPassword}
                />

                <InputField
                    label="First name"
                    name="firstName"
                    required
                    ref={firstNameRef}
                    error={formError.firstName}
                />

                <InputField
                    label="Last name"
                    name="lastName"
                    required
                    ref={lastNameRef}
                    error={formError.lastName}
                />

                <SelectField
                    label="Gender"
                    name="gender"
                    required
                    ref={genderRef}
                    options={genders.map((gender) => [gender, gender])}
                    error={formError.gender}
                />

                <InputField
                    type="date"
                    label="Birthday"
                    name="birthday"
                    required
                    ref={birthdayRef}
                    error={formError.birthday}
                />
            </fieldset>

            <button type="submit">Submit</button>
        </form>
    );
}
