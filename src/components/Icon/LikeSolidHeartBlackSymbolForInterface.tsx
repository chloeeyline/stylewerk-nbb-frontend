import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLikeSolidHeartBlackSymbolForInterface = (
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
        <path d="M459 19.28c-63.743 0-115.094 35.209-153.593 80.995C267.999 52.94 216.744 19.28 153 19.28 63.227 19.28 0 96.469 0 180.638c0 45.154 18.494 77.686 38.747 108.229l237.781 285.078c26.699 25.033 31.729 25.033 58.427 0l238.316-285.078C597.082 258.324 612 225.792 612 180.638 612 96.469 548.772 19.28 459 19.28" />
    </svg>
);
const ForwardRef = forwardRef(SvgLikeSolidHeartBlackSymbolForInterface);
export default ForwardRef;
