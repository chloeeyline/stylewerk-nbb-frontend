import type React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { updateUserData, validatePassword } from "~/redux/features/user/user-api";
import { genders, UserData } from "~/redux/features/user/user-schemas";
import { getUserData } from "~/redux/features/user/user-slice";
import { useAppDispatch } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import Columns from "./Columns";
import styles from "./form-fields.module.scss";
import InputField from "./InputField";
import SelectField from "./SelectField";

type FormErrors = {
    firstName: string | null;
    lastName: string | null;
    gender: string | null;
    password: string | null;
    repeatPassword: string | null;
};

const initialFormErrors: FormErrors = {
    firstName: null,
    lastName: null,
    gender: null,
    password: null,
    repeatPassword: null,
};

export default function UpdateUserForm(props: {
    firstName: string;
    lastName: string;
    gender: UserData["gender"];
}) {
    const { t } = useTranslation();

    const [state, setState] = useState<{
        submitting: boolean;
        error: string | null;
    }>({
        submitting: false,
        error: null,
    });

    const [formError, setFormError] = useState<FormErrors>({ ...initialFormErrors });

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);

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

        const firstName = firstNameRef.current?.value ?? "";
        const lastName = lastNameRef.current?.value ?? "";
        const gender = genderRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const repeatPassword = repeatPasswordRef.current?.value ?? "";

        const errors: FormErrors = { ...initialFormErrors };
        let errorCount = 0;

        if (firstName.length <= 0) {
            errors.firstName = t("formErrors.pleaseEnter", { what: t("formFields.firstName") });
            errorCount++;
        }

        if (lastName.length <= 0) {
            errors.firstName = t("formErrors.pleaseEnter", { what: t("formFields.lastName") });
            errorCount++;
        }

        if (genders.includes(gender) === false) {
            errors.gender = t("formErrors.pleaseSelect", { what: t("formFields.gender") });
            errorCount++;
        }

        if (password.length >= 1) {
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

        if (errorCount !== 0) {
            setFormError({ ...errors });
            setState({
                ...state,
                submitting: false,
                error: t("formErrors.general"),
            });
            return;
        }

        const updates: Record<string, string> = {};

        if (firstName !== props.firstName) {
            updates.firstName = firstName;
        }

        if (lastName !== props.lastName) {
            updates.lastName = lastName;
        }

        if (gender !== props.gender) {
            updates.gender = gender;
        }

        if (password !== "") {
            updates.password = password;
        }

        const update = await updateUserData(updates);

        if (update.ok !== true) {
            setState({
                ...state,
                error: t(`errorCodes.${update.error.message}`),
                submitting: false,
            });
            return;
        }

        setState({
            ...state,
            error: null,
            submitting: false,
        });

        dispatch(getUserData());
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
                    {t("formNames.updateUserData")}
                </legend>
                {state.error !== null ? <span className="error">{state.error}</span> : null}

                <Columns>
                    <InputField
                        className="bg-base-300"
                        label={t("formFields.firstName")}
                        name="firstName"
                        required
                        defaultValue={props.firstName}
                        ref={firstNameRef}
                        error={formError.firstName}
                    />

                    <InputField
                        className="bg-base-300"
                        label={t("formFields.lastName")}
                        name="lastName"
                        required
                        defaultValue={props.lastName}
                        ref={lastNameRef}
                        error={formError.lastName}
                    />
                </Columns>

                <SelectField
                    className="bg-base-300"
                    label={t("formFields.gender")}
                    name="gender"
                    required
                    ref={genderRef}
                    defaultValue={props.gender}
                    options={genders.map(
                        (gender) => [gender, t(`userGenders.${gender}`)] as [string, string],
                    )}
                    error={formError.gender}
                />

                <InputField
                    className="bg-base-300"
                    type="password"
                    label={t("formFields.password")}
                    name="password"
                    ref={passwordRef}
                    error={formError.password}
                />

                <InputField
                    className="bg-base-300"
                    type="password"
                    label={t("formFields.repeatPassword")}
                    name="repeatPassword"
                    ref={repeatPasswordRef}
                    error={formError.repeatPassword}
                />

                <button type="submit" className="btn btn-primary p-1 m-bs-0">
                    {t("formSubmit.updateUserData")}
                </button>
            </fieldset>
        </form>
    );
}
