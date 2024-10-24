import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Logo from "~/components/Logo";

export default function Home() {
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="size-block-100">
            <h1>{t("nav.homepage")}</h1>
            <ScrollContainer direction="vertical">
                <Logo className="m-i-auto m-b-3" style={{ inlineSize: "25ch" }} />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime voluptatibus modi
                dolorem, iusto error provident minus sit illo tenetur pariatur doloremque ullam.
                Voluptatum eius placeat, magnam aliquam voluptas voluptatibus fuga.
            </ScrollContainer>
        </Grid>
    );
}
