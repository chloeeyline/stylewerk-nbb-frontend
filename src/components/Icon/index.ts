import { lazy } from "react";

export default {
    ArrowRight: lazy(() => import("./ArrowRight")),
    Copy: lazy(() => import("./Copy")),
    Cross: lazy(() => import("./Cross")),
    Download: lazy(() => import("./Download")),
    Edit: lazy(() => import("./Edit")),
    Filter: lazy(() => import("./Filter")),
    Folder: lazy(() => import("./Folder")),
    Globe: lazy(() => import("./Globe")),
    Hide: lazy(() => import("./Hide")),
    Home: lazy(() => import("./Home")),
    Move: lazy(() => import("./Move")),
    Paintbrush: lazy(() => import("./Paintbrush")),
    Plus: lazy(() => import("./Plus")),
    Refresh: lazy(() => import("./Refresh")),
    Save: lazy(() => import("./Save")),
    Show: lazy(() => import("./Show")),
    Trash: lazy(() => import("./Trash")),
    User: lazy(() => import("./User")),
};
