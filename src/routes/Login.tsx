import LoginForm from "~/components/forms/LoginForm";
import Grid from "~/components/layout/Grid";

export default function Login() {
    return (
        <Grid layout="contentCenter" className="size-block-100">
            <LoginForm />
        </Grid>
    );
}
