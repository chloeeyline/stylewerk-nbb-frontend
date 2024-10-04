import type React from "react";
import { useReducer, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { userPromise } from "~/redux/features/user/user-class";

type RegistrationState = Record<
    | "username"
    | "email"
    | "password"
    | "repeatPassword"
    | "firstName"
    | "lastName"
    | "gender"
    | "birthday",
    { value: string; error: string | null }
>;

type RegistrationReducerActions = {
    field: keyof RegistrationState;
    update: {
        value: string;
        error: string | null;
    };
};

const genders = ["NotSpecified", "Female", "Male", "NonBinary"] as const;

const registrationReducer = (state: RegistrationState, action: RegistrationReducerActions) => {
    const newState = { ...state };

    switch (action.field) {
        case "username":
            newState.username = action.update;
            break;
        case "email":
            newState.email = action.update;
            break;
        case "password":
            newState.password = action.update;
            break;
        case "repeatPassword":
            newState.repeatPassword = action.update;
            break;
        case "firstName":
            newState.firstName = action.update;
            break;
        case "lastName":
            newState.lastName = action.update;
            break;
        case "gender":
            newState.gender = action.update;
            break;
        case "birthday":
            newState.birthday = action.update;
            break;
    }

    return newState;
};

export default function RegistrationForm() {
    const [registered, setRegistered] = useState<boolean>(false);

    const [registrationState, registrationDispatch] = useReducer(registrationReducer, {
        username: { value: "", error: null },
        email: { value: "", error: null },
        password: { value: "", error: null },
        repeatPassword: { value: "", error: null },
        firstName: { value: "", error: null },
        lastName: { value: "", error: null },
        gender: { value: "NotSpecified", error: null },
        birthday: { value: "", error: null },
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = await userPromise;

        


        setRegistered(true);
    };

    const onBlur = (
        name: keyof RegistrationState,
        e: React.FocusEvent<HTMLInputElement, Element>,
    ) => {
        if (e.target.required === true && e.target.value.length === 0) {
            registrationDispatch({
                field: name,
                update: {
                    value: e.target.value,
                    error: `Please enter ${name}!`,
                },
            });
        }
    };

    const onChange = (
        name: keyof RegistrationState,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        registrationDispatch({
            field: name,
            update: {
                value: e.target.value,
                error: `Please enter ${name}!`,
            },
        });
    };

    if (registered) {
        return (
            <div>
                Registration complete! Please verify your email using the link sent to you to
                activate login for your account.
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            <InputField
                label="Username"
                name="username"
                required
                state={registrationState.username}
                onBlur={onBlur.bind(undefined, "username")}
                onChange={onChange.bind(undefined, "username")}
            />
            <InputField
                label="Email"
                name="email"
                required
                state={registrationState.email}
                onBlur={onBlur.bind(undefined, "email")}
                onChange={onChange.bind(undefined, "email")}
            />
            <InputField
                type="password"
                label="Password"
                name="password"
                required
                state={registrationState.password}
                onBlur={onBlur.bind(undefined, "password")}
                onChange={onChange.bind(undefined, "password")}
            />
            <InputField
                type="password"
                label="Repeat password"
                name="repeatPassword"
                required
                state={registrationState.repeatPassword}
                onBlur={onBlur.bind(undefined, "repeatPassword")}
                onChange={onChange.bind(undefined, "repeatPassword")}
            />
            <InputField
                label="First name"
                name="firstName"
                state={registrationState.firstName}
                onBlur={onBlur.bind(undefined, "firstName")}
                onChange={onChange.bind(undefined, "firstName")}
            />
            <InputField
                label="Last name"
                name="lastName"
                state={registrationState.lastName}
                onBlur={onBlur.bind(undefined, "lastName")}
                onChange={(e) => onChange("lastName", e)}
            />
            <SelectField
                label="Gender"
                name="gender"
                options={genders.map((gender) => [gender, gender])}
                state={registrationState.gender}
                onChange={onChange.bind(undefined, "gender")}
            />

            <InputField
                type="date"
                label="Birthday"
                name="birthday"
                state={registrationState.birthday}
                onBlur={onBlur.bind(undefined, "birthday")}
                onChange={onChange.bind(undefined, "birthday")}
            />

            <button type="submit">Submit</button>
        </form>
    );
}
