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
                    className="d-flex gap-1 p-1 m-be-6"
                    style={{ alignItems: "baseline", justifyContent: "center" }}>
                    <Logo style={{ maxInlineSize: "25ch" }} />
                    <SWLogo style={{ maxInlineSize: "7.5ch" }} />
                </div>
                <div className="d-grid gap-6 p-1" style={{ placeItems: "center" }}>
                    <a className="btn btn-primary p-1" href="/Benutzerhandbuch.pdf" target="_blank">
                        {t("nav.userManual")}
                    </a>

                    <video
                        controls
                        playsInline
                        muted
                        autoPlay
                        loop
                        src="/tutorial.webm"
                        className="rounded-4 shadow"
                        style={{
                            inlineSize: "75ch",
                            border: "medium solid var(--clr-body)",
                        }}
                    />
                </div>
            </ScrollContainer>
        </Grid>
    );
}
