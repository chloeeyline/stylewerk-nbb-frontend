import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteAnnouncer() {
    const { pathname } = useLocation();

    const [routeAnnouncement, setRouteAnnouncement] = useState("");

    const previouslyLoadedPath = useRef(pathname);

    const waitTime = 90;

    useEffect(() => {
        if (previouslyLoadedPath.current === pathname) return;
        previouslyLoadedPath.current = pathname;

        if (document.querySelector("h1")) {
            const pageHeader = document.querySelector("h1");
            const content = pageHeader?.innerText ?? pageHeader?.textContent ?? document.head.title;

            const timeout = setTimeout(() => setRouteAnnouncement(content), waitTime);

            return () => clearTimeout(timeout);
        }
    }, [pathname]);

    return (
        <div
            style={{
                border: "0px",
                clip: "rect(0px, 0px, 0px, 0px)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: "0px",
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal",
            }}
            aria-live="assertive"
            role="alert"
            id="__route-announcer__">
            {routeAnnouncement}
        </div>
    );
}
