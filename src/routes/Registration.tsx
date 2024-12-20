import RegistrationForm from "~/components/forms/RegistrationForm";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";

export default function Registration() {
    return (
        <Grid layout="contentCenter" className="size-block-100">
            <ScrollContainer direction="vertical">
                <RegistrationForm />
            </ScrollContainer>
        </Grid>
    );
}
