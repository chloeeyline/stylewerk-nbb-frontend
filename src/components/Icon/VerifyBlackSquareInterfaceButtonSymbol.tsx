import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgVerifyBlackSquareInterfaceButtonSymbol = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M428.266 199.55 295.691 429.165c-.975 2.812-2.41 5.508-4.743 7.688-7.708 7.229-19.813 6.827-27.043-.88l-87.439-80.65c-7.229-7.707-6.828-19.813.88-27.023 7.708-7.229 19.813-6.827 27.042.88l68.429 63.112 122.304-211.848c5.279-9.142 16.983-12.278 26.125-7 9.162 5.26 12.299 16.965 7.02 26.106" />
    </svg>
);
const ForwardRef = forwardRef(SvgVerifyBlackSquareInterfaceButtonSymbol);
export default ForwardRef;
