import { lazy } from "react";

export default {
    ArrowRight: lazy(() => import("./ArrowRight")),
    Cross: lazy(() => import("./Cross")),
    Download: lazy(() => import("./Download")),
    Filter: lazy(() => import("./Filter")),
    Globe: lazy(() => import("./Globe")),
    Home: lazy(() => import("./Home")),
    Move: lazy(() => import("./Move")),
    Paintbrush: lazy(() => import("./Paintbrush")),
    Plus: lazy(() => import("./Plus")),
    Refresh: lazy(() => import("./Refresh")),
    User: lazy(() => import("./User")),
};
