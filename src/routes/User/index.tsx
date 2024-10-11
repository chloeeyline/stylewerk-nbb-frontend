import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import UpdateEmailForm from "~/components/forms/UpdateEmailForm";
import UpdateUserForm from "~/components/forms/UpdateUserForm";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { getUserData, logoutUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function User() {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.status === "loggedIn" && user.dataStatus === "empty") {
            dispatch(getUserData());
        }
    }, [user.status, user.dataStatus]);

    if (user.status !== "loggedIn") {
        return (
            <div>
                <h1>User - not loggedn in...</h1>
            </div>
        );
    }

    if (user.dataStatus === "loading") {
        return (
            <div>
                <h1>User - loading</h1>
            </div>
        );
    }

    if (user.dataStatus === "error" || typeof user.data === "undefined") {
        return (
            <div>
                <h1>User - Error loading data...</h1>
            </div>
        );
    }

    const { username, email, birthday, firstName, lastName, gender } = user.data;
    const admin = user.admin ?? false;

    console.log(username, email, birthday, firstName, lastName, gender);

    return (
        <Grid layout="header" className="size-block-100">
            <h1>
                {t("common.user", { count: 1 })}: {username}
                {admin === true ? " - is admin" : ""}
            </h1>
            <Grid layout="contentCenter">
                <ScrollContainer direction="vertical">
                    <div>
                        <UpdateEmailForm email={email} />
                        <UpdateUserForm firstName={firstName} lastName={lastName} gender={gender} />
                    </div>
                </ScrollContainer>
            </Grid>
        </Grid>
    );
}
