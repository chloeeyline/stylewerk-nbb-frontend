import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import ResetPasswordForm from "~/components/forms/ResetPasswordForm";

export default function UserResetPassword() {
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="size-block-100">
            <h1>{t("nav.resetPassword")}</h1>
            <Grid layout="contentCenter">
                <ScrollContainer direction="vertical">
                    <ResetPasswordForm />
                </ScrollContainer>
            </Grid>
        </Grid>
    );
}
