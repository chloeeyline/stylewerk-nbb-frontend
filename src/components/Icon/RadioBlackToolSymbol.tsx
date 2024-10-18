import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRadioBlackToolSymbol = (
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
        <path d="M535.5 153.093h-40.162L293.875 40.638c-9.142-5.068-20.846-2.065-26.125 6.713s-2.142 20.005 7 25.073l145.521 80.65H76.5c-42.247 0-76.5 34.253-76.5 76.5v267.75c0 42.247 34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5v-267.75c0-42.228-34.253-76.481-76.5-76.481m-325.125 306H95.625c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h114.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m0-76.5H95.625c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h114.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m0-76.5H95.625c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h114.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m191.25 172.125c-63.38 0-114.75-51.369-114.75-114.75s51.37-114.75 114.75-114.75 114.75 51.389 114.75 114.75c0 63.381-51.37 114.75-114.75 114.75m0-191.25c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgRadioBlackToolSymbol);
export default ForwardRef;
