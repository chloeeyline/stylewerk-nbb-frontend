import type React from "react";
import { useRef, useState } from "react";
import { User } from "~/redux/features/user/user-class";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";
import SelectField from "./SelectField";

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

        const username = usernameRef.current?.value ?? "";
        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const repeatPassword = repeatPasswordRef.current?.value ?? "";
        const firstName = firstNameRef.current?.value ?? "";
        const lastName = lastNameRef.current?.value ?? "";
        const gender = genderRef.current?.value ?? "";
        const birthday = birthdayRef.current?.value ?? "";

        const errors: FormErrors = { ...initialFormErrors };
        let errorCount = 0;

        if (username.length <= 0) {
            errors.username = "Please enter a username!";
            errorCount++;
        } else {
            const usernameResult = await User.validateUsername(username);

            if (usernameResult.ok === false) {
                errors.username = usernameResult.error.message;
                errorCount++;
            }
        }

        if (email.length <= 0) {
            errors.email = "Please enter an email!";
            errorCount++;
        } else {
            const emailResult = await User.validateEmail(email);

            if (emailResult.ok === false) {
                errors.email = emailResult.error.message;
                errorCount++;
            }
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

        if (password !== repeatPassword) {
            errors.repeatPassword = "Passwords don't match!";
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

        const registrationResult = await User.registration({
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

                {registration.submitting === true ? <div>Submitting...</div> : null}
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
