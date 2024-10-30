import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
import styles from "./sw-logo.module.scss";

const SvgLogo = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        className={className}
        xmlSpace="preserve"
        viewBox="0 0 19.9417 10"
        role="img"
        aria-label="Stylewerk-Logo"
        ref={ref}
        {...props}>
        <path
            className={styles.drawBgS}
            fill="none"
            stroke="var(--clr-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.5 3h0a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2h0a2 2 0 0 0 2 2h3.5a2 2 0 0 1 2 2h0a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h0"
        />
        <path
            className={styles.drawPathS}
            fill="none"
            stroke="var(--clr-header)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.75"
            d="M8.5 3h0a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2h0a2 2 0 0 0 2 2h3.5a2 2 0 0 1 2 2h0a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h0"
        />
        <path
            className={styles.drawBgW}
            fill="none"
            stroke="var(--clr-accent)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.4417 1h0a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5V6a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1.5a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h0"
        />
        <path
            fill="none"
            className={styles.drawPathW}
            stroke="var(--clr-header)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.75"
            d="M12.4417 1h0a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5V6a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1.5a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5h0"
        />
    </svg>
);

const ForwardRef = forwardRef(SvgLogo);
export default ForwardRef;
