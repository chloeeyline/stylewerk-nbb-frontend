import type React from "react";
import { memo, useDeferredValue, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

/**
 * We can't declare the Wrapper inline, because it would break the transition.
 * Not if we pass one in or we use this fallback
 * I suspect the element gets destroyed, react looses track of it and then it gets recreated.
 */
const FallbackWrapper: React.ElementType = memo((props) => <div {...props} />);

export type TransitionProps = {
    inState?: boolean;
    children: React.ReactNode;
    className: string;
    transitionKey?: React.Key | null | undefined;
    Component?: React.ElementType;
};

/**
 * A generic Transition component.
 * Intended to be wrapped in components with specific transitions.
 */
export default function Transition({
    inState,
    children,
    className,
    transitionKey,
    Component,
}: TransitionProps) {
    const nodeRef = useRef(null);

    const Wrapper = Component ?? FallbackWrapper;

    const deferredInState = useDeferredValue(inState);

    return (
        <Wrapper className={className}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    in={deferredInState}
                    nodeRef={nodeRef}
                    key={transitionKey}
                    timeout={125}>
                    <div ref={nodeRef}>{children}</div>
                </CSSTransition>
            </SwitchTransition>
        </Wrapper>
    );
}
