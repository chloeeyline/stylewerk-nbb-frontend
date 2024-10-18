import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgVerifyCircularBlackButtonSymbol = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-136.992 306-306S475.008 0 306 0m122.266 199.55S293.282 434.654 290.949 436.834c-7.708 7.229-19.813 6.828-27.024-.88l-87.439-80.649c-7.229-7.708-6.828-19.813.88-27.043 7.708-7.21 19.813-6.828 27.023.88l68.429 63.112 122.304-211.848c5.279-9.142 16.983-12.278 26.125-7 9.161 5.298 12.298 17.003 7.019 26.144" />
    </svg>
);
const ForwardRef = forwardRef(SvgVerifyCircularBlackButtonSymbol);
export default ForwardRef;
