import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowBlackTriangleSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.026 612.026"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M43.967 503.035h524.022c51.477 0 49.752-30.279 35.169-52.853L337.065 34.964c-12.182-17.093-48.464-18.578-62.873 0L8.121 450.182c-13.207 24.625-14.954 52.853 35.846 52.853m545.46 43.705H21.831C9.78 546.74 0 556.519 0 568.592c0 12.072 9.78 21.852 21.831 21.852h567.596c12.051 0 21.831-9.779 21.831-21.852 0-12.05-9.78-21.852-21.831-21.852" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowBlackTriangleSymbol);
export default ForwardRef;
