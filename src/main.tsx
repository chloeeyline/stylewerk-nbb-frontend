import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import RouterProvider from "~/providers/RouterProvider";
import Loader from "./components/layout/Loader";
import ReduxProvider from "./providers/ReduxProvider";
import "./utils/i18n";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<Loader />}>
            <ReduxProvider>
                <RouterProvider />
            </ReduxProvider>
        </Suspense>
    </StrictMode>,
);
