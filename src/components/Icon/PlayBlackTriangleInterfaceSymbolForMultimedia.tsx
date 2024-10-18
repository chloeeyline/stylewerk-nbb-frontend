import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPlayBlackTriangleInterfaceSymbolForMultimedia = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 779.652 779.652"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M679.503 349.728 151.09 9.181C119.742-7.703 83.832-5.951 83.832 54.688v670.58c0 55.408 38.525 64.17 67.258 45.506l528.442-340.547c21.723-22.252 21.723-58.274-.029-80.499" />
    </svg>
);
const ForwardRef = forwardRef(SvgPlayBlackTriangleInterfaceSymbolForMultimedia);
export default ForwardRef;
