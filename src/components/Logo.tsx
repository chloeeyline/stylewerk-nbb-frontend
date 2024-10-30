import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
import styles from "./logo.module.scss";

const SvgLogo = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        className={className}
        xmlSpace="preserve"
        viewBox="0 0 10.578 7.05"
        role="img"
        aria-label="NBB-Logo"
        ref={ref}
        {...props}>
        <defs>
            <clipPath id="b" clipPathUnits="userSpaceOnUse">
                <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".7"
                    d="M3.1748 3.3515a1.9403 1.9403 0 0 1 1.9403 1.9403.882.882 0 0 0 .882.8819.5292.5292 0 0 1 .5291.5292.5292.5292 0 0 1-.5292.5291h-.529v.5292h2.4694V-.1763H3.1748z"
                />
            </clipPath>
            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".7"
                    d="M5.997 3.3515a1.9403 1.9403 0 0 1 1.9403 1.9403A1.9403 1.9403 0 0 1 5.997 7.232v.1764h4.7625V-.1763H6.5262v3.3514H5.997Z"
                />
            </clipPath>
        </defs>
        <path
            className={styles.drawPathN}
            fill="none"
            stroke="var(--clr-header)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth=".7"
            d="M.35 4.5833h0a.7056.7056 0 0 1 .7056-.7055.7056.7056 0 0 1 .7055.7055V6.7 5.2889a1.4111 1.4111 0 0 1 1.4111-1.4111 1.4111 1.4111 0 0 1 1.4111 1.411A1.4111 1.4111 0 0 0 5.9944 6.7"
        />
        <path
            className={styles.drawPathBOne}
            fill="none"
            stroke="var(--clr-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth=".7"
            d="M4.586 2.8223h.7055a.7056.7056 135 0 0 .7055-.7055V1.0584A.7056.7056 45 0 0 5.2915.353h0a.7056.7056 135 0 0-.7056.7055v4.2334a1.4111 1.4111 45 0 0 1.4111 1.411h0a1.4111 1.4111 135 0 0 1.4112-1.411v0A1.4111 1.4111 45 0 0 5.997 3.8806a1.4111 1.4111 135 0 0-1.411 1.4112"
            clipPath="url(#b)"
            transform="translate(-.0026 -.0029)"
        />
        <path
            className={styles.drawPathBTwo}
            fill="none"
            stroke="var(--clr-accent)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth=".7"
            d="M7.4082 2.8223h.7055a.7056.7056 135 0 0 .7056-.7055V1.0584A.7056.7056 45 0 0 8.1137.353h0a.7056.7056 135 0 0-.7055.7055v4.2334a1.4111 1.4111 45 0 0 1.411 1.411 1.4111 1.4111 135 0 0 1.4112-1.411v0a1.4111 1.4111 45 0 0-1.4111-1.4112h0a1.4111 1.4111 135 0 0-1.4111 1.4112v0"
            clipPath="url(#a)"
            transform="translate(-.0026 -.0029)"
        />
    </svg>
);

const ForwardRef = forwardRef(SvgLogo);
export default ForwardRef;
