import type { RouteObject } from "react-router-dom";

import { Entries } from "#/routes";

/**
 * All routes regarding entries
 * - list route
 * - view route
 * - edit route
 */
export const entriesRoutes: RouteObject[] = [
    {
        path: Entries.List,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Entries/Layout");

            return { Component };
        },
        children: [
            {
                path: Entries.List,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Entries");

                    return { Component };
                },
            },
            {
                path: Entries.View,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Entries/View");

                    return { Component };
                },
            },
        ],
    },
    {
        path: Entries.Edit,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Entries/Edit");

            return { Component };
        },
    },
];
