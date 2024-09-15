import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";

import RootErrorBoundary from "~/components/layout/RootErrorBoundary";
import RootLayout from "~/routes/RootLayout";
import { adminRoutes } from "./admin-routes";
import { entriesRoutes } from "./entries-routes";
import { generalRoutes } from "./general-routes";
import { templatesRoutes } from "./templates-routes";
import { userRoutes } from "./user-routes";

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
