import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";

import Routes from "#/routes";
import RootErrorBoundary from "~/components/router/root-error-boundary";
import { lazyRoute } from "~/utils/lazy-route-helper";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: lazyRoute(() => import("~/routes/root")),
        errorElement: <RootErrorBoundary />,
        children: [
            {
                path: Routes.Home,
                lazy: lazyRoute(() => import("~/routes")),
            },
            {
                path: Routes.Login,
                lazy: lazyRoute(() => import("~/routes/login")),
            },
            {
                path: Routes.Registration,
                lazy: lazyRoute(() => import("~/routes/registration")),
            },
            {
                path: Routes.User,
                lazy: lazyRoute(() => import("~/routes/user")),
            },
            {
                path: Routes.UserChangeEmail,
                lazy: lazyRoute(() => import("~/routes/user/change-email")),
            },
            {
                path: Routes.UserResetPassword,
                lazy: lazyRoute(() => import("~/routes/user/reset-password")),
            },
            {
                path: Routes.Templates,
                lazy: lazyRoute(() => import("~/routes/templates")),
            },
            {
                path: Routes.TemplatesEdit,
                lazy: lazyRoute(() => import("~/routes/templates/edit")),
            },
            {
                path: Routes.Entries,
                lazy: lazyRoute(() => import("~/routes/entries")),
            },
            {
                path: Routes.EntriesEdit,
                lazy: lazyRoute(() => import("~/routes/entries/edit")),
            },
            {
                path: Routes.Admin,
                lazy: lazyRoute(() => import("~/routes/admin")),
            },
            {
                path: Routes.AdminManageThemes,
                lazy: lazyRoute(() => import("~/routes/admin/manage-themes")),
            },
            {
                path: Routes.AdminManageTranslations,
                lazy: lazyRoute(() => import("~/routes/admin/manage-translations")),
            },
            {
                path: Routes.AdminManageUsers,
                lazy: lazyRoute(() => import("~/routes/admin/manage-users")),
            },
        ],
    },
]);

export default function RouterProvider() {
    return <ReactRouterProvider router={router} />;
}
