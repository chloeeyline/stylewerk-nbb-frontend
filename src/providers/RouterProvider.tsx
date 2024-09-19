import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";

import RootErrorBoundary from "~/components/layout/RootErrorBoundary";
import RootLayout from "~/routes/RootLayout";
import { adminRoutes } from "./routes/admin";
import { entriesRoutes } from "./routes/entries";
import { generalRoutes } from "./routes/general";
import { templatesRoutes } from "./routes/templates";
import { userRoutes } from "./routes/user";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <RootErrorBoundary />,
        children: [
            ...generalRoutes,
            ...userRoutes,
            ...templatesRoutes,
            ...entriesRoutes,
            ...adminRoutes,
        ],
    },
]);

export default function RouterProvider() {
    return <ReactRouterProvider router={router} />;
}
