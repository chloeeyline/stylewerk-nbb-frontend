import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCross = (
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
        <path d="m444.644 306 138.644-138.644c38.284-38.284 38.284-100.36 0-138.644s-100.359-38.284-138.644 0L306 167.356 167.356 28.713c-38.284-38.284-100.36-38.284-138.644 0s-38.284 100.36 0 138.644L167.356 306 28.713 444.644c-38.284 38.283-38.284 100.36 0 138.644s100.36 38.284 138.644 0L306 444.644l138.644 138.644c38.283 38.284 100.36 38.284 138.644 0s38.284-100.36 0-138.644z" />
    </svg>
);
const ForwardRef = forwardRef(SvgCross);
export default ForwardRef;
