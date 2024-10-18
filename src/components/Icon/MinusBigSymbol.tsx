import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMinusBigSymbol = (
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
        <path d="M535.5 229.5h-459C34.253 229.5 0 263.753 0 306s34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgMinusBigSymbol);
export default ForwardRef;
