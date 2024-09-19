import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import RouterProvider from "~/providers/RouterProvider";
import ReduxProvider from "./providers/ReduxProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider>
            <RouterProvider />
        </ReduxProvider>
    </StrictMode>,
);
