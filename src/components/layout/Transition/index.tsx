import type React from "react";
import { useDeferredValue, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import styles from "./transition.module.scss";
import cls from "~/utils/class-name-helper";

export type TransitionProps = {
    children?: React.ReactNode | undefined;
    inState?: boolean;
    transition?: "fade" | "fadeHorizontal" | "fadeVertical";
    transitionKey?: React.Key | null | undefined;
    scrollContainer?: "horizontal" | "vertical" | "both";
};

/**
 * A generic Transition component.
 * Intended to be wrapped in components with specific transitions.
 */
export default function Transition({
    inState,
    children,
    transition,
    transitionKey,
    scrollContainer,
}: TransitionProps) {
    const nodeRef = useRef(null);

    const deferredInState = useDeferredValue(inState);

    const scrollHorizontal = scrollContainer === "horizontal" || scrollContainer === "both";
    const scrollVertical = scrollContainer === "vertical" || scrollContainer === "both";

    return (
        <div
            style={{
                overflowY: scrollVertical ? "auto" : undefined,
                overflowX: scrollHorizontal ? "auto" : undefined,
                maxBlockSize: scrollVertical ? "100%" : undefined,
                maxInlineSize: scrollHorizontal ? "100%" : undefined,
                blockSize: scrollVertical ? "100%" : undefined,
                inlineSize: scrollHorizontal ? "100%" : undefined,
            }}
            className={cls(styles.transitionWrapper, styles[transition ?? "fade"])}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    in={deferredInState}
                    nodeRef={nodeRef}
                    key={transitionKey}
                    timeout={125}>
                    <div
                        style={{
                            overflowY: scrollVertical ? "auto" : undefined,
                            overflowX: scrollHorizontal ? "auto" : undefined,
                            maxBlockSize: scrollVertical ? "100%" : undefined,
                            maxInlineSize: scrollHorizontal ? "100%" : undefined,
                            blockSize: scrollVertical ? "100%" : undefined,
                            inlineSize: scrollHorizontal ? "100%" : undefined,
                        }}
                        ref={nodeRef}>
                        {children}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}
