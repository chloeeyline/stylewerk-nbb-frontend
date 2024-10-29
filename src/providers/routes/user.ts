import type { RouteObject } from "react-router-dom";

import { User } from "#/routes";

/**
 * All routes regarding the user
 * - profile route
 * - change email route
 * - reset password route
 */
export const userRoutes: RouteObject[] = [
    {
        path: User.Index,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User");

            return { Component };
        },
    },
    {
        path: User.ResetPassword,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User/ResetPassword");

            return { Component };
        },
    },
    {
        path: User.VerifyEmail,
        lazy: async () => {
            const { default: Component } = await import("~/routes/User/VerifyEmail");

            return { Component };
        },
    },
];
