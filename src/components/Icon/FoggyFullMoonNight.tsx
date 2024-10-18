import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFoggyFullMoonNight = (
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
        <path d="M401.625 573.75h-191.25c-10.557 0-19.125 8.568-19.125 19.125S199.818 612 210.375 612h191.25c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125M601.979 382.5C608.29 358.001 612 332.469 612 306 612 137.012 475.008 0 306 0S0 137.012 0 306c0 26.469 3.71 52.001 10.021 76.5zM535.5 497.25h-459c-10.557 0-19.125 8.568-19.125 19.125S65.943 535.5 76.5 535.5h459c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125m57.375-76.5H19.125C8.568 420.75 0 429.318 0 439.875S8.568 459 19.125 459h573.75c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgFoggyFullMoonNight);
export default ForwardRef;
