import LoginForm from "~/components/general/LoginForm";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";

export default function Login() {
    return (
        <Grid layout="header">
            <h1>Login</h1>
            <ScrollContainer direction="vertical">
                <LoginForm />
            </ScrollContainer>
        </Grid>
    );
}
