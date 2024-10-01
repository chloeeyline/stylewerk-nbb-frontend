import type { RouteObject } from "react-router-dom";

import { Templates } from "#/routes";
/**
 * All routes regarding templates
 * - list route
 * - view route
 * - edit route
 */
export const templatesRoutes: RouteObject[] = [
    {
        path: Templates.List,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Templates/Layout");

            return { Component };
        },
        children: [
            {
                path: Templates.List,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Templates");

                    return { Component };
                },
            },
            {
                path: Templates.View,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Templates/View");

                    return { Component };
                },
            },
        ],
    },
    {
        path: Templates.Edit,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Templates/Edit");

            return { Component };
        },
    },
];
