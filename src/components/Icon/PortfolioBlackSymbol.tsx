import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPortfolioBlackSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612 612"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M535.5 95.625H420.75v-38.25c0-21.133-17.117-38.25-38.25-38.25h-153c-21.133 0-38.25 17.136-38.25 38.25v38.25H76.5c-42.247 0-76.5 34.253-76.5 76.5v95.625h612v-95.625c0-42.247-34.253-76.5-76.5-76.5m-153 0h-153V76.5c0-10.557 8.568-19.125 19.125-19.125h114.75c10.557 0 19.125 8.568 19.125 19.125zm0 229.5c0 42.247-34.253 76.5-76.5 76.5s-76.5-34.253-76.5-76.5c0-6.655 1.033-13.024 2.697-19.125H0v210.375c0 42.247 34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5V306H379.804c1.663 6.12 2.696 12.47 2.696 19.125m-38.25 0c0-7-2.027-13.483-5.298-19.125h-65.885c-3.29 5.642-5.317 12.125-5.317 19.125 0 21.133 17.117 38.25 38.25 38.25s38.25-17.117 38.25-38.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgPortfolioBlackSymbol);
export default ForwardRef;
