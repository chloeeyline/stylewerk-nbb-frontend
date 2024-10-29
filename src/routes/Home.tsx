import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Logo from "~/components/Logo";
import SWLogo from "~/components/SWLogo";

export default function Home() {
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="size-block-100">
            <h1>{t("nav.homepage")}</h1>
            <ScrollContainer direction="vertical">
                <div
                    className="d-flex gap-1 p-1"
                    style={{ alignItems: "baseline", justifyContent: "center" }}>
                    <Logo style={{ maxInlineSize: "25ch" }} />
                    <SWLogo style={{ maxInlineSize: "7.5ch" }} />
                </div>
                <div className="d-grid gap-1 p-1" style={{ placeItems: "center" }}>
                    <video controls src="/Tutorial.mp4" style={{ maxInlineSize: "70ch" }} />
                    <a href="/Benutzerhandbuch.pdf" target="_blank">
                        {t("nav.userManual")}
                    </a>
                </div>
            </ScrollContainer>
        </Grid>
    );
}
