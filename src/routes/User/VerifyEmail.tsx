import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Routes from "#/routes";
import { verifyEmail } from "~/redux/features/user/user-api";
import Grid from "~/components/layout/Grid";

export default function VerifyEmail() {
    const { t } = useTranslation();
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const id = new URLSearchParams(document.location.search).get("id");

    const [error, setError] = useState<string | undefined>(
        id === null ? t("verify.mailNothing") : undefined,
    );

    useEffect(() => {
        if (isVerified === false && typeof id === "string") {
            verifyEmail(id).then((result) => {
                if (result.ok === false) {
                    setError(
                        t("verify.mailError", {
                            error: t(`errorCodes.${result.error.message}`),
                        }),
                    );
                }

                setIsVerified(true);
            });
        }
    }, []);

    if (typeof error === "string") {
        return (
            <Grid layout="contentCenter" className="size-100">
                <p>{error}</p>
            </Grid>
        );
    }

    if (isVerified) {
        return (
            <Grid layout="contentCenter" className="size-100">
                <p>{t("verify.mailOk")}</p>
                <Link to={Routes.Login}>{t("nav.login")}</Link>
            </Grid>
        );
    }

    return (
        <Grid layout="contentCenter" className="size-100">
            <p>{t("verify.mailInProgress")}</p>
        </Grid>
    );
}
