import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootErrorBoundary() {
    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error) === false && !(error instanceof Response)) {
        return (
            <div>
                <h1>Something went wrong</h1>
                <p>Oops...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>
                {error.status} - {error.statusText}
            </h1>
            {error.status === 404 ? <p>This page doesn't exist!</p> : null}
            {error.status === 401 ? <p>You aren't authorized to see this!</p> : null}
            {error.status === 503 ? <p>Looks like our API is down</p> : null}
            {error.status === 418 ? <p>🫖</p> : null}
        </div>
    );
}
