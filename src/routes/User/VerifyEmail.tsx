import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Routes from "~/constants/routes";
import { verifyEmail } from "~/redux/features/user/user-api";

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
                            error: result.error.message,
                        }),
                    );
                }

                setIsVerified(true);
            });
        }
    }, []);

    if (typeof error === "string") {
        return <p>{error}</p>;
    }

    if (isVerified) {
        return (
            <div>
                <p>{t("verify.mailOk")}</p>
                <Link to={Routes.Login} />
            </div>
        );
    }

    return <p>{t("verify.mailInProgress")}</p>;
}
