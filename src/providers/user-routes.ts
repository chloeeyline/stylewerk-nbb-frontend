import type { RouteObject } from "react-router-dom";

import { Routes } from "#/routes";

/**
 * All routes regarding the user
 * - profile route
 * - change email route
 * - reset password route
 */
export const userRoutes: RouteObject[] = [
    {
        path: Routes.User,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User");

            return { Component };
        },
    },
    {
        path: Routes.UserChangeEmail,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User/ChangeEmail");

            return { Component };
        },
    },
    {
        path: Routes.UserResetPassword,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User/ResetPassword");

            return { Component };
        },
    },
];
