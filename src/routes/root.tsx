import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Root() {
    return (
        <div>
            <Outlet />
            <ScrollRestoration />
        </div>
    );
}
