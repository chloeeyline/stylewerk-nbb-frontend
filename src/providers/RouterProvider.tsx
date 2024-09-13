import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";

import Routes from "#/routes";
import RootErrorBoundary from "~/components/router/RootErrorBoundary";
import { lazyRoute } from "~/utils/lazy-route-helper";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: lazyRoute(() => import("~/routes/Root")),
        errorElement: <RootErrorBoundary />,
        children: [
            {
                path: Routes.Home,
                lazy: lazyRoute(() => import("~/routes/Home")),
            },
            {
                path: Routes.Login,
                lazy: lazyRoute(() => import("~/routes/Login")),
            },
            {
                path: Routes.Registration,
                lazy: lazyRoute(() => import("~/routes/Registration")),
            },
            {
                path: Routes.User,
                lazy: lazyRoute(() => import("~/routes/User")),
            },
            {
                path: Routes.UserChangeEmail,
                lazy: lazyRoute(() => import("~/routes/User/ChangeEmail")),
            },
            {
                path: Routes.UserResetPassword,
                lazy: lazyRoute(() => import("~/routes/User/ResetPassword")),
            },
            {
                path: Routes.Templates,
                lazy: lazyRoute(() => import("~/routes/Templates")),
            },
            {
                path: Routes.TemplatesEdit,
                lazy: lazyRoute(() => import("~/routes/Templates/Edit")),
            },
            {
                path: Routes.Entries,
                lazy: lazyRoute(() => import("~/routes/Entries")),
            },
            {
                path: Routes.EntriesEdit,
                lazy: lazyRoute(() => import("~/routes/Entries/Edit")),
            },
            {
                path: Routes.Admin,
                lazy: lazyRoute(() => import("~/routes/Admin")),
            },
            {
                path: Routes.AdminManageThemes,
                lazy: lazyRoute(() => import("~/routes/Admin/ManageThemes")),
            },
            {
                path: Routes.AdminManageTranslations,
                lazy: lazyRoute(() => import("~/routes/Admin/ManageTranslations")),
            },
            {
                path: Routes.AdminManageUsers,
                lazy: lazyRoute(() => import("~/routes/Admin/ManageUsers")),
            },
        ],
    },
]);

export default function RouterProvider() {
    return <ReactRouterProvider router={router} />;
}
