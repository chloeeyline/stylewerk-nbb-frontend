import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgStarBlackFivepointedShapeSymbol = (
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
        <path d="M612 234.167 400.898 201.96 306 0l-94.898 201.96L0 234.167l152.713 156.365L116.567 612 306 507.387 495.434 612l-36.147-221.468z" />
    </svg>
);
const ForwardRef = forwardRef(SvgStarBlackFivepointedShapeSymbol);
export default ForwardRef;
