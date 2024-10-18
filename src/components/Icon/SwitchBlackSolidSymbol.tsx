import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSwitchBlackSolidSymbol = (
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
        <path d="M420.75 229.5c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m0-114.75h-229.5C85.623 114.75 0 200.373 0 306s85.623 191.25 191.25 191.25h229.5C526.377 497.25 612 411.627 612 306s-85.623-191.25-191.25-191.25m0 306C357.37 420.75 306 369.38 306 306s51.37-114.75 114.75-114.75S535.5 242.62 535.5 306s-51.37 114.75-114.75 114.75" />
    </svg>
);
const ForwardRef = forwardRef(SvgSwitchBlackSolidSymbol);
export default ForwardRef;
