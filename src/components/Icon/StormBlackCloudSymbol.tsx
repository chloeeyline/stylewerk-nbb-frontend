import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgStormBlackCloudSymbol = (
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
        <path d="M133.875 516.375c-10.557 0-19.125 8.568-19.125 19.125v57.375c0 10.557 8.568 19.125 19.125 19.125S153 603.432 153 592.875V535.5c0-10.557-8.568-19.125-19.125-19.125m114.75 0c-10.557 0-19.125 8.568-19.125 19.125v57.375c0 10.557 8.568 19.125 19.125 19.125s19.125-8.568 19.125-19.125V535.5c0-10.557-8.568-19.125-19.125-19.125M441.156 96.18C413.081 39.264 354.635 0 286.875 0 196.05 0 121.826 70.399 115.381 159.598 48.616 178.627 0 236.959 0 306c0 81.473 67.703 147.875 153 152.541 0 0 274.08.459 277.312.459C530.661 459 612 377.661 612 277.312c0-96.676-75.582-175.491-170.844-181.132m-77.781 420.195c-10.557 0-19.125 8.568-19.125 19.125v57.375c0 10.557 8.568 19.125 19.125 19.125s19.125-8.568 19.125-19.125V535.5c0-10.557-8.568-19.125-19.125-19.125m114.75 0c-10.557 0-19.125 8.568-19.125 19.125v57.375c0 10.557 8.568 19.125 19.125 19.125s19.125-8.568 19.125-19.125V535.5c0-10.557-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgStormBlackCloudSymbol);
export default ForwardRef;
