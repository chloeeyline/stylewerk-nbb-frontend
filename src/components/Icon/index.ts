import { lazy } from "react";

export default {
    AdditionSign: lazy(() => import("./AdditionSign")),
    ArrowRight: lazy(() => import("./ArrowRight")),
    Cross: lazy(() => import("./Cross")),
    Download: lazy(() => import("./Download")),
    Equalizer: lazy(() => import("./Equalizer")),
    Globe: lazy(() => import("./Globe")),
    Home: lazy(() => import("./Home")),
    Move: lazy(() => import("./Move")),
    Paintbrush: lazy(() => import("./Paintbrush")),
    Refresh: lazy(() => import("./Refresh")),
    User: lazy(() => import("./User")),
};
