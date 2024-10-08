import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Routes from "~/constants/routes";
import { User } from "~/redux/features/user/user-class";

export default function VerifyEmail() {
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const id = new URLSearchParams(document.location.search).get("id");

    const [error, setError] = useState<string | undefined>(
        id === null ? "Nothing to verify..." : undefined,
    );

    useEffect(() => {
        if (isVerified === false && typeof id === "string") {
            User.verifyEmail(id).then((result) => {
                if (result.ok === false) {
                    setError(`Failed verifying: ${result.error.message}`);
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
                <p>Verified Email! You can now login!</p>
                <Link to={Routes.Login} />
            </div>
        );
    }

    return <p>Verifying Email...</p>;
}
