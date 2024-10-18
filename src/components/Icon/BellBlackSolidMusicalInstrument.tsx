import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBellBlackSolidMusicalInstrument = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.301 612.302"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M510.54 26.617C413.378-28.176 289.125 4.341 233.027 99.238l-81.25 137.471L.149 334.504l190.448 107.402c-4.243 8.323-6.854 17.625-6.854 27.601 0 33.802 27.396 61.198 61.198 61.198 21.929 0 41.002-11.628 51.814-28.947l196.017 110.544 10.894-177.147 81.25-137.471c56.078-94.919 22.786-216.274-74.376-271.067" />
    </svg>
);
const ForwardRef = forwardRef(SvgBellBlackSolidMusicalInstrument);
export default ForwardRef;
