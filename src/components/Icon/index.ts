import { lazy } from "react";

export default {
    Copy: lazy(() => import("./Copy")),
    Download: lazy(() => import("./Download")),
    Move: lazy(() => import("./Move")),
    Trash: lazy(() => import("./Trash")),
};
