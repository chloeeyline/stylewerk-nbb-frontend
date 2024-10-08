import RegistrationForm from "~/components/forms/RegistrationForm";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";

export default function Registration() {
    return (
        <Grid layout="header">
            <h1>Registration</h1>
            <ScrollContainer direction="vertical">
                <RegistrationForm />
            </ScrollContainer>
        </Grid>
    );
}
