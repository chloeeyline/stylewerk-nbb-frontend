import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UpdateEmailForm from "~/components/forms/UpdateEmailForm";
import UpdateUserForm from "~/components/forms/UpdateUserForm";
import UserGuard from "~/components/general/UserGuard";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { removeSessions } from "~/redux/features/user/user-api";
import { getUserData, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const UserPage = () => {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const [sessions, setSessions] = useState<boolean | undefined>();

    useEffect(() => {
        if (user.status === "loggedIn" && user.dataStatus === "empty") {
            dispatch(getUserData());
        }
    }, [user.status, user.dataStatus]);

    if (user.status !== "loggedIn") {
        return (
            <div>
                <h1>{t("userStates.notLoggedIn")}</h1>
            </div>
        );
    }

    if (user.dataStatus === "loading") {
        return (
            <div>
                <h1>{t("userDataStates.loading")}</h1>
            </div>
        );
    }

    if (user.dataStatus === "error" || typeof user.data === "undefined") {
        return (
            <div>
                <h1>{t("userDataStates.error")}</h1>
            </div>
        );
    }

    const { username, email, firstName, lastName, gender } = user.data;
    const admin = user.admin ?? false;

    return (
        <Grid layout="header">
            <h1>
                {t("common.user", { count: 1 })}: {username}
                {admin === true ? ` ${t("common.isAdmin")}` : ""}
            </h1>
            <ScrollContainer direction="vertical">
                <Grid layout="contentCenter" allowOverflow>
                    <UpdateEmailForm email={email} />
                    <UpdateUserForm firstName={firstName} lastName={lastName} gender={gender} />
                    <button
                        type="button"
                        className="btn btn-error p-1 m-bs-1"
                        onClick={async () => {
                            if (sessions === false) {
                                return;
                            }

                            setSessions(false);

                            await removeSessions();

                            setSessions(true);
                        }}>
                        {t(
                            `common.${
                                typeof sessions === "undefined"
                                    ? "clearOtherSessions"
                                    : sessions === true
                                    ? "otherSessionsCleared"
                                    : "clearingOtherSessions"
                            }`,
                        )}
                    </button>
                </Grid>
            </ScrollContainer>
        </Grid>
    );
};

export default function User() {
    return (
        <UserGuard>
            <UserPage />
        </UserGuard>
    );
}
