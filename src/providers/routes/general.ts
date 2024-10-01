import type { RouteObject } from "react-router-dom";

import Routes from "#/routes";

/**
 * All general routes
 * - index route
 * - login route
 * - registration route
 */
export const generalRoutes: RouteObject[] = [
    {
        path: Routes.Home,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Home");

            return { Component };
        },
    },
    {
        path: Routes.Login,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Login");

            return { Component };
        },
    },
    {
        path: Routes.Registration,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Registration");

            return { Component };
        },
    },
];
